import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL
import { getAuthConfig } from '../utils/helpers'

export const login = async (email, password) => {
  try {
    const url = baseUrl + '/login'
    const { data } = await axios.post(url, { email, password })
    const { authToken, user } = data

    // If authToken exists, set it to localStorage and return user data
    if (authToken) {
      localStorage.setItem('authToken', authToken)
      return { success: true, user }
    } else {
      return { success: false, message: 'Failed to get authToken'}
    }
  } catch (err) {
    console.error('[Login failed]: ', err)

    // Return error message
    const message = err.response.data.message
    return { success: false, message}
  }
}

export const authCheck = async () => {
  try {
    // Send request
    const url = baseUrl + '/authCheck'
    const config = getAuthConfig()
    const { data } = await axios.get(url, config)

    // Return result
    return { 
      success: data.isAuthorized,
      user: data.isAuthorized ? data.user : null
    }
  } catch (err) {
    console.error('[Authentication failed]: ', err)

    // Return error message
    return { success: false, err}
  }
}
