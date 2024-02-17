import axios from 'axios'
import dayjs from 'dayjs'
import { getAuthConfig } from '../utils/helpers'
const baseUrl = import.meta.env.VITE_BASE_URL + '/records'

export const getRecords = async (type, date) => {
  try {
    // Query setting
    const isIncome = type === 'income'
    const year = date ? dayjs(date).year() : ''
    const month = date ? dayjs(date).month() + 1 : ''
    const url = `${baseUrl}?isIncome=${isIncome}&year=${year}&month=${month}`

    // Send request
    const config = getAuthConfig()
    const { data } = await axios.get(url, config)

    // Return data
    return { success: true, records: data.records, month: data.period}
  } catch (err) {
    console.error('[Get records failed]:', err)
    
    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const getRecord = async (id) => {
  try {
    // Send request
    const url = `${baseUrl}/${id}`
    const config = getAuthConfig()
    const { data } = await axios.get(url, config)

    // Return data
    return { success: true, record: data.record}
  } catch (err) {
    console.error('[Get record failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const postRecord = async (payload) => {
  try {
    // Send request
    const config = getAuthConfig()
    const { data } = await axios.post(baseUrl, payload, config)

    // Return data
    return { success: true, record: data.record}
  } catch (err) {
    console.error('[Post record failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const patchRecord = async (id, payload) => {
  try {
    // Send request
    const url = `${baseUrl}/${id}`
    const config = getAuthConfig()
    const { data } = await axios.patch(url, payload, config)

    // Return data
    return { success: true, record: data.record}
  } catch (err) {
    console.error('[Patch record failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const deleteRecord = async (id) => {
  try {
    // Send request
    const url = `${baseUrl}/${id}`
    const config = getAuthConfig()
    const { data } = await axios.delete(url, config)

    // Return data
    return { success: true, record: data.record}
  } catch (err) {
    console.error('[Delete record failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}

export const getReport = async (date) => {
  try {
    // Query setting
    const year = date ? dayjs(date).year() : ''
    const month = date ? dayjs(date).month() + 1 : ''
    const url = `${baseUrl}/report?year=${year}&month=${month}`

    // Send request
    const config = getAuthConfig()
    const { data } = await axios.get(url, config)

    // Return data
    return {
      success: true,
      report: {
        month: `${dayjs(date).format('MMM YYYY')}`,
        ...data.report
      }
     }
  } catch (err) {
    console.error('[Get report failed]:', err)

    // Return error message
    const status = err.response.status
    const message = err.response.data.message
    return { success: false, message, status}
  }
}
