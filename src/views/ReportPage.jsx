import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { getReport } from '../api/record'
import { useApiErr } from '../utils/ApiErrorContext'
import { toast } from '../utils/helpers'
import { 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Divider
} from '@chakra-ui/react'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import MonthlyHeader from '../components/MonthlyHeader'
import DonutChart from '../components/DonutChart'

const Wrapper = styled.div`
  flex: 1;
  width: 95%;
  max-width: 1000px;
  margin-top: 10px;
  margin-bottom: 130px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 960px) {
    margin-bottom: 20px;
  }
`

const Chart = styled.div`
  flex: 1;
  width: 100%;
  min-width: 380px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChartTitle = styled.div`
  width: 100%;
  line-height: 40px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.mainTextColor};
  text-align: center;
`

const ChartGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @media screen and (min-width: 960px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  }
`

const ChartTable = ({ data }) => {
  return (
    <TableContainer py='30px' px={5}>
      <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Category</Th>
              <Th>Total Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(i => (
              <Tr key={i.categoryName}>
                <Td>{i.categoryName || '(Uncategoriezed)'}</Td>
                <Td>{i.totalAmount || ''}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
    </TableContainer>
  )
}

const SummaryWrapper = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  .balance {
    grid-column: 1 / 3
  }

  @media screen and (min-width: 960px){
    grid-template-columns: repeat(3, 1fr);
    .balance {
      grid-column: unset;
    }
  }
`

const SummaryItem = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
`

const SummaryTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  color: ${({ theme }) => theme.mainTextColor};
  text-align: center;
`

const SummaryText = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  color: ${({ theme }) => theme.mainTextColor};
  text-align: center;
`

const Summary = ({ data }) => {
  return (
    <SummaryWrapper>
      <SummaryItem>
        <SummaryTitle>Total Income</SummaryTitle>
        <SummaryText>{data?.income.total}</SummaryText>
      </SummaryItem>
      <SummaryItem>
        <SummaryTitle>Total Expense</SummaryTitle>
        <SummaryText>{data?.expense.total}</SummaryText>
      </SummaryItem>
      <SummaryItem className='balance'>
        <SummaryTitle>Balance</SummaryTitle>
        <SummaryText>{data?.balance}</SummaryText>
      </SummaryItem>
    </SummaryWrapper>
  )
}


function ReportPage ({ isMobile }) {
  const [month, setMonth] = useState(null)
  const [report, setReport] = useState(null)
  const [incomeCategories, setIncomeCategories] = useState([])
  const [incomeSums, setIncomeSums] = useState([])
  const [expenseCategories, setExpenseCategories] = useState([])
  const [expenseSums, setExpenseSums] = useState([])
  const { apiErrorHandler } = useApiErr()

  // ** Data fetching function
  const getReportAsync = async (date) => {
    try {
      const res = await getReport(date)
      if (res.success) {
        const is = res.report.income.sumByCategory
        const es = res.report.expense.sumByCategory

        setReport(res.report)
        setIncomeCategories(is.map(i => i.categoryName || '(Uncategorized)'))
        setIncomeSums(is.map(i => i.totalAmount))
        setExpenseCategories(es.map(e => e.categoryName || '(Uncategorized)'))
        setExpenseSums(es.map(e => e.totalAmount))
        setMonth(res.report.month)
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

    getReportAsync(date)
  }

  // ** Get records from API when page first loads
  useEffect(() => {
    const date = month || new Date()
    getReportAsync(date)
  }, [])

  return (
    <Container>
      <Navbar isMobile={isMobile} page="report" />
      <MonthlyHeader isMobile={isMobile} page="report" month={month} switchMonth={switchMonth} />
      <Wrapper>
        <Summary data={report} />
        <ChartGroup>
          <Chart>
            <ChartTitle>Income</ChartTitle>
            <Divider w='90%' mb={3}/>
            <DonutChart labels={incomeCategories} series={incomeSums}/>
            <ChartTable data={report?.income.sumByCategory} />
          </Chart>
          <Chart>
            <ChartTitle>Expense</ChartTitle>
            <Divider w='90%' mb={3}/>
            <DonutChart labels={expenseCategories} series={expenseSums}/>
            <ChartTable data={report?.expense.sumByCategory} />
          </Chart>
        </ChartGroup>
        
      </Wrapper>
    </Container>
  )
}

export default ReportPage
