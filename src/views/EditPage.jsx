// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import RecordForm from '../components/RecordForm'

const dummyRecord = {
  id: 1,
  title: 'Jan Salary',
  amount: 50000,
  date: '2024-01-05',
  categoryId: 6,
  Category: {
    id: 6,
    name: 'Salary'
  }
}

function EditPage({ isMobile, page }) {
  return (
    <Container>
      <Navbar isMobile={isMobile} page={page}/>
      <PlainHeader isEdit={true}/>
      <RecordForm page={page} record={dummyRecord}/>
    </Container>
  )
}

export default EditPage
