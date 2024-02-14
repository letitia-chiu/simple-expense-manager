import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL

export const login = async (email, password) => {
  try {
    const path = baseUrl + '/login'
    const { data } = await axios.post(path, { email, password })
    const { authToken, user } = data

    // If authToken exists, set it to localStorage and return user data
    if (authToken) {
      localStorage.setItem('authToken', authToken)
      return { success: true, user }
    }
  } catch (err) {
    console.error('[Login failed]: ', err)

    // Return error message
    const message = err.response.data.message
    return { success: false, message}
  }
}
