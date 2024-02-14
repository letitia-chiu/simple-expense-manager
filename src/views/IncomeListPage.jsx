import { Link } from 'react-router-dom'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import MonthlyHeader from '../components/MonthlyHeader'
import RecordList from '../components/RecordList'
import RecordTable from '../components/RecordTable'
import CreateButton from '../components/CreateButton'

const dummyIncomes = [
  {
    id: 1,
    title: 'Jan Salary',
    amount: 50000,
    date: '2024-01-05',
    Category: {
      id: 6,
      name: 'Salary'
    }
  },
  {
    id: 2,
    title: 'Jan Bonus',
    amount: 6000,
    date: '2024-01-29',
    Category: {
      id: 7,
      name: 'Bonus'
    }
  }
]

function IncomeListPage({ isMobile }) {
  return (
    <Container>
      <Navbar isMobile={isMobile} page="income"/>
      <MonthlyHeader isMobile={isMobile} page="income"/>
      {isMobile ? <RecordList records={dummyIncomes}/> : <RecordTable records={dummyIncomes}/> }
      <Link to="/income/create"><CreateButton /></Link>
    </Container>
  )
}

export default IncomeListPage
