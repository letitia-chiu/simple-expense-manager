// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import MonthlyHeader from '../components/MonthlyHeader'
import RecordList from '../components/RecordList'
import RecordTable from '../components/RecordTable'
import CreateButton from '../components/CreateButton'

const dummyExpenses = [
  {
    id: 3,
    title: 'Coffee',
    amount: 60,
    date: '2024-01-20',
    categoryId: 1,
    Category: {
      id: 1,
      name: 'Food'
    }
  },
  {
    id: 4,
    title: 'EZ card charge',
    amount: 500,
    date: '2024-1-24',
    categoryId: 2,
    Category: {
      id: 2,
      name: 'Transportation'
    }
  }
]

function ExpenseListPage({ isMobile }) {
  return (
    <Container>
      <Navbar isMobile={isMobile} page="expense"/>
      <MonthlyHeader isMobile={isMobile} page="expense"/>
      {isMobile ? <RecordList records={dummyExpenses}/> : <RecordTable records={dummyExpenses}/> }
      <CreateButton isMobile={isMobile}/>
    </Container>
  )
}

export default ExpenseListPage
