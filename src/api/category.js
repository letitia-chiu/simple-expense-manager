import axios from 'axios'
import { getAuthConfig } from '../utils/helpers'
const baseUrl = import.meta.env.VITE_BASE_URL + '/categories'

export const getCategories = async (type) => {
  try {
    // Query setting
    const isIncome = type === 'income'
    const url = `${baseUrl}?isIncome=${isIncome}`

    // Send request
    const config = getAuthConfig()
    const { data } = await axios.get(url, config)

    // Return data
    return { success: true, categories: data.categories}
    
  } catch (err) {
    console.error('[Get categories failed]:', err)

    // Return error message
    const message = err.response.data.message
    return { success: false, message}
  }
}