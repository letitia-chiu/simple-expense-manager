// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import RecordForm from '../components/RecordForm'

function CreatePage({ isMobile, type }) {

  return (
    <Container>
      <Navbar isMobile={isMobile} page={type}/>
      <PlainHeader page={type}/>
      <RecordForm type={type} />
    </Container>
  )
}

export default CreatePage
