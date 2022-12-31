export const calculateTotal = ({ exento, importation, service, asset }) => {
  return (
    parseFloat(asset) +
    parseFloat(importation) +
    parseFloat(service)
  )
    - parseFloat(exento)
}
