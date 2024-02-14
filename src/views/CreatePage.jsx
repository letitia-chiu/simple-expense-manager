// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import RecordForm from '../components/RecordForm'

function CreatePage({ isMobile, page }) {
  return (
    <Container>
      <Navbar isMobile={isMobile} page={page}/>
      <PlainHeader page={page}/>
      <RecordForm page={page} />
    </Container>
  )
}

export default CreatePage
