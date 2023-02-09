import { gql } from '@apollo/client'

export const CREATE_REPORT = gql`
query CreateReport($report: ReportInput) {
  createReport(report: $report) {
    ... on AccountPayableReport {
      id
      idDocumentType
      documentName
      nit
      providerName
      idCompany
      companyName
      accountNumber
      accountName
      serie
      documentNumber
      documentDate
      exento
      importation
      service
      asset
      subtotal
      iva
      total
    }
  }
}
`
