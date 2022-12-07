import jwtDecode from 'jwt-decode'

export const isTokenExpired = (token = '') => {
  try {
    console.log("token", token)
    if (!token) return false
    const { exp } = jwtDecode(token)

    const today = Date.now()
    const expToCompare = exp * 1000

    console.log('today', today)
    console.log('expToCompare', expToCompare)

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
