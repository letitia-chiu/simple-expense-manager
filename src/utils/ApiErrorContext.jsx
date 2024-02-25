import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from './helpers'
import toastMsg from './toast-messages'

const defaultContext = {
  apiErrorHandler: null
}

const ApiErrorContext = createContext(defaultContext)

export const useApiErr = () => useContext(ApiErrorContext)

export const ApiErrProvider = ({ children }) => {
  const navigate = useNavigate()
  const locale = localStorage.getItem('lang') || 'en'

  const apiErrorHandler = (res, errTitle) => {
    const isUnauthorized = res.status ? res.status === 401 : false
    let title = ''
    if (isUnauthorized) {
      title = toastMsg.login[locale]?.fail || 'Login Failed'
    } else {
      title = errTitle || 'Loading Failed'
    }
    let text = '' 
    if (res.message) {
      if (res.message === 'Invalid email or password') {
        text = toastMsg.login[locale]?.invalid || res.message
      } else {
        text = res.message
      }
    }
  
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