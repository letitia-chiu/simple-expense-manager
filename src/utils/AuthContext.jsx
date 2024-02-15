import { login, authCheck } from "../api/auth"
import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
}

const AuthContext = createContext(defaultAuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const authCheckAsync = async () => {
      const result = await authCheck()
      if (result.success) {
        setIsAuthenticated(true)
        setUser(result.user)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    }

    authCheckAsync()
  }, [pathname])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: user && { id: user.id, name: user.name },

        login: async (email, password) => {
          const res = await login(email, password)
          if (res.success && res.user) {
            setUser(res.user)
            setIsAuthenticated(true)
          } else {
            setUser(null)
            setIsAuthenticated(false)
          }
          return res
        }
      }}    
    >
      {children}
    </AuthContext.Provider>
  )
}