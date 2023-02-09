export const currencyFormatter = (value, region, currency) => {
  if (region != undefined || null || "") {
    region = "es-GT";
  }

  if (currency != undefined || null || "") {
    currency = "GTQ";
  }
  let valueParse = +value;
  let valueFixed = valueParse.toFixed(2);
  let test = new Intl.NumberFormat(region, {
    style: "currency",
    currency: currency,
  }).format(valueFixed);
  return test;
};
