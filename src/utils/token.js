import jwtDecode from 'jwt-decode'

export const isTokenExpired = (token = '') => {
  try {
    if (!token) return false
    const { exp } = jwtDecode(token)

    const today = Date.now()
    const expToCompare = exp * 1000

    if (today >= expToCompare) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
