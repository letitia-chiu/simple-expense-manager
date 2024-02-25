/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { getRecords } from '../api/record'
import { toast } from '../utils/helpers'
import { useApiErr } from '../utils/ApiErrorContext'
import { FormattedMessage } from 'react-intl'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import MonthlyHeader from '../components/MonthlyHeader'
import RecordList from '../components/RecordList'
import RecordTable from '../components/RecordTable'
import CreateButton from '../components/CreateButton'


function RecordListPage({ type, isMobile }) {
  const [records, setRecords] = useState([])
  const [month, setMonth] = useState(null)
  const { apiErrorHandler } = useApiErr()

  // ** Data fetching function
  const getRecordsAsync = async (type, date) => {
    try {
      const res = await getRecords(type, date)
      if (res.success) {
        setRecords(res.records)
        setMonth(res.month)
      } else {
        apiErrorHandler(res)
      }
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

  // ** Get records from API when page first loads
  useEffect(() => {
    const date = month ? dayjs(month, 'MMM YYYY') : dayjs()
    getRecordsAsync(type, date)
  }, [type])

  return (
    <Container>
      <Navbar isMobile={isMobile} page={type}/>
      <MonthlyHeader isMobile={isMobile} page={type} month={month} switchMonth={switchMonth}/>
      {isMobile ? <RecordList records={records}/> : <RecordTable records={records}/> }
      <FormattedMessage id="addRecord" defaultMessage="Add Record">
        {msg => <CreateButton link={`/${type}/create`} title={msg}/>}
      </FormattedMessage>
      
    </Container>
  )
}

export default RecordListPage
