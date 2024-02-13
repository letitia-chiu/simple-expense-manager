// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import MonthlyHeader from '../components/MonthlyHeader'

function IncomeListPage({ isMobile }) {
  return (
    <Container>
      <Navbar isMobile={isMobile} page="income"/>
      <MonthlyHeader isMobile={isMobile} page="income"/>
    </Container>
  )
}

export default IncomeListPage
