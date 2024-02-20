import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from './helpers'

const defaultContext = {
  apiErrorHandler: null
}

const ApiErrorContext = createContext(defaultContext)

export const useApiErr = () => useContext(ApiErrorContext)

export const ApiErrProvider = ({ children }) => {
  const navigate = useNavigate()

  const apiErrorHandler = (res, errTitle) => {
    const isUnauthorized = res.status ? res.status === 401 : false
    let title = ''
    if (isUnauthorized) {
      title = 'Please login'
    } else {
      title = errTitle || 'Loading Failed'
    }
    const text = res.message || ''
  
    // Show error toast
    toast('error', title, text)
  
    // If status is 401 (Unauthorized), redirect to login
    if (res.status === 401) return navigate('/login')
  }

  return (
    <ApiErrorContext.Provider
      value={{ apiErrorHandler }}
    >
      {children}
    </ApiErrorContext.Provider>
  )
}