import { useContext } from 'react'
import { AppContext } from 'context/AppContext'

const useCustomContext = () => {
  return useContext(AppContext)
}
export default useCustomContext
