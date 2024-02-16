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
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const getCategory = async (id) => {
  try {
    // Send request
    const url = `${baseUrl}/${id}`
    const config = getAuthConfig()
    const { data } = await axios.get(url, config)

    // Return data
    return { success: true, category: data.category}
  } catch (err) {
    console.error('[Get category failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const postCategory = async (payload) => {
  try {
    // Send request
    const config = getAuthConfig()
    const { data } = await axios.post(baseUrl, payload, config)

    // Return data
    return { success: true, category: data.category}
  } catch (err) {
    console.error('[Post category failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const patchCategory = async (id, payload) => {
  try {
    // Send request
    const url = `${baseUrl}/${id}`
    const config = getAuthConfig()
    const { data } = await axios.patch(url, payload, config)

    // Return data
    return { success: true, category: data.category}
  } catch (err) {
    console.error('[Patch category failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const deleteCategory = async (id) => {
  try {
    // Send request
    const url = `${baseUrl}/${id}`
    const config = getAuthConfig()
    const { data } = await axios.delete(url, config)

    // Return data
    return { success: true, category: data.category}
  } catch (err) {
    console.error('[Delete category failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}
