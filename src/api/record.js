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
    console.log(data)

    // Return data
    return { success: true, records: data.records}
  } catch (err) {
    console.error('[Get records failed]:', err)

    // Return error message
    const message = err.response.data.message
    return { success: false, message}
  }
}
