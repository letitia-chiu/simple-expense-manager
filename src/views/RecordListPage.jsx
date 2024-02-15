import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { getRecords } from '../api/record'
import { toast } from '../utils/helpers'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import MonthlyHeader from '../components/MonthlyHeader'
import RecordList from '../components/RecordList'
import RecordTable from '../components/RecordTable'
import CreateButton from '../components/CreateButton'


function RecordListPage({ type, isMobile }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [records, setRecords] = useState([])
  const [month, setMonth] = useState(null)

  // ** Data fetching function
  const getRecordsAsync = async (type, date) => {
    try {
      const res = await getRecords(type, date)
      if (res.success) {
        setRecords(res.records)
        setMonth(res.month)
        return
      }
      // Handle error message
      const message = res.message || ''
      toast('error', 'Loading Failed', message)
    } catch (err) {
      toast('error', err)
    }
  }

  // ** Month switch function
  const switchMonth = (option) => {
    let date = dayjs(month, 'MMM YYYY')

    if (option === 'prev') {
      date = date.subtract(1, 'month')
    } else if (option === 'next') {
      date = date.add(1, 'month')
    } else return

    getRecordsAsync(type, date)
  }

  // ** Auth Check
  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [navigate, isAuthenticated])

  // ** Get records from API when page first loads
  useEffect(() => {
    const date = month || new Date()
    getRecordsAsync(type, date)
  }, [type])

  return (
    <Container>
      <Navbar isMobile={isMobile} page={type}/>
      <MonthlyHeader isMobile={isMobile} page={type} month={month} switchMonth={switchMonth}/>
      {isMobile ? <RecordList records={records}/> : <RecordTable records={records}/> }
      <CreateButton link={`/${type}/create`} title="Add Record"/>
    </Container>
  )
}

export default RecordListPage
