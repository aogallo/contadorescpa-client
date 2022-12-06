import jwtDecode from 'jwt-decode'

export const isTokenExpired = (token = '') => {
  try {
    console.log("token", token)
    const { exp } = jwtDecode(token)

    console.log("exp", exp)

    if (Date.now() >= exp * 1000) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
