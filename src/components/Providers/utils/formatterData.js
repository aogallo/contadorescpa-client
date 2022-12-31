export const formatterData = ({ getProviderById }) => {
  return (
    {
      id: getProviderById.id,
      name: getProviderById.name,
      nit: getProviderById.nit,
      address: getProviderById.address,
      email: getProviderById.email,
      phone: getProviderById.phone,
      creditDay: getProviderById.creditDay,
      companies: getProviderById.companies
    }
  )
}

export const initialProviderData = {
  id: 0,
  name: '',
  nit: '',
  address: '',
  email: '',
  phone: '',
  creditDay: '',
  companies: []
}
