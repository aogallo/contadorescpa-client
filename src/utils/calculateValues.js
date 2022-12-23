export const calculateTotal = ({ exento, importation, service, asset }) => {
  return parseFloat(exento) +
    parseFloat(importation) +
    parseFloat(service) +
    parseFloat(asset)
}
