export const formattedDateToSave = (accountPayable) => {
  console.log('datos', accountPayable)
  const { documentDate } = accountPayable
  const dateFormatted = `${documentDate.getFullYear()}${(documentDate.getUTCMonth() + 1).toString().padStart(2, '0')}${documentDate.getUTCDate().toString().padStart(2, '0')}`

  return {
    ...accountPayable,
    documentDate: dateFormatted,
    exento: parseFloat(accountPayable.exento),
    importation: parseFloat(accountPayable.importation),
    service: parseFloat(accountPayable.service),
    asset: parseFloat(accountPayable.asset),
    subtotal: parseFloat(accountPayable.subtotal),
    iva: parseFloat(accountPayable.iva),
    total: parseFloat(accountPayable.total)
  }
}

export const formattedAccountPayableForState = ({ getAccountPayableById: accountPayable }) => {
  const [day, month, year] = accountPayable.documentDate.split('/')
  const documentDate = new Date(year, month - 1, day)
  return {
    id: accountPayable.id,
    idDocumentType: accountPayable.documentType.id,
    idProviderCompany: accountPayable.idProviderCompany,
    idAccount: accountPayable.account.id,
    serie: accountPayable.serie,
    documentNumber: accountPayable.documentNumber,
    documentDate,
    exento: accountPayable.exento,
    importation: accountPayable.importation,
    service: accountPayable.service,
    asset: accountPayable.asset,
    subtotal: accountPayable.subtotal,
    iva: accountPayable.iva,
    total: accountPayable.total
  }
}

export const initialDataAccountPayable = {
  id: 0,
  idDocumentType: '',
  idProviderCompany: '',
  idAccount: '',
  serie: '',
  documentNumber: '',
  documentDate: new Date(),
  exento: 0,
  importation: 0,
  service: 0,
  asset: 0,
  subtotal: 0.00,
  iva: 0.00,
  total: 0.00
}

export const formatterDataToTable = ({ getAccountPayableByIdCompany = [] }) => {
  if (getAccountPayableByIdCompany.length === 0) return []

  const newAccountsPayableData = getAccountPayableByIdCompany.map(accountPayable => {
    const {
      account: {
        id: idAccount,
        name: accountName
      },
      provider: {
        id: idProvider,
        name: providerName
      },
      documentType: {
        name: documentTypeName
      }
    } = accountPayable
    return {
      ...accountPayable,
      idAccount,
      accountName,
      idProvider,
      providerName,
      documentTypeName
    }
  })

  return newAccountsPayableData
}
