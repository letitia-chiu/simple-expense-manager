import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getRecords } from '../api/record'
import { toast } from '../utils/helpers'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import MonthlyHeader from '../components/MonthlyHeader'
import RecordList from '../components/RecordList'
import RecordTable from '../components/RecordTable'
import CreateButton from '../components/CreateButton'


function IncomeListPage({ isMobile }) {
  const [records, setRecords] = useState([])
  const [month, setMonth] = useState([])

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
      console.error(err)
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

    getRecordsAsync('income', date)
  }

  // ** Get records from API when page first loads
  useEffect(() => {
    getRecordsAsync('income', new Date())
  }, [])

  return (
    <Container>
      <Navbar isMobile={isMobile} page="income"/>
      <MonthlyHeader isMobile={isMobile} page="income" month={month} switchMonth={switchMonth}/>
      {isMobile ? <RecordList records={records}/> : <RecordTable records={records}/> }
      <Link to="/income/create"><CreateButton /></Link>
    </Container>
  )
}

export default IncomeListPage
