// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'

function CreatePage({ isMobile, page }) {
  return (
    <Container>
      <Navbar isMobile={isMobile} page={page}/>
      <PlainHeader page={page}/>
    </Container>
  )
}

export default CreatePage
