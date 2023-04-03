export const currencyFormatter = (value, region, currency) => {
  if (region != undefined || null || '') {
    region = 'es-GT'
  }

  if (currency != undefined || null || '') {
    currency = 'GTQ'
  }
  const valueParse = +value
  const valueFixed = valueParse.toFixed(2)
  const test = new Intl.NumberFormat(region, {
    style: 'currency',
    currency
  }).format(valueFixed)
  return test
}
