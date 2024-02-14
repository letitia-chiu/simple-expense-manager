import { useParams } from 'react-router-dom'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import RecordForm from '../components/RecordForm'

function EditPage({ isMobile, page }) {
  const { id } = useParams()

  return (
    <Container>
      <Navbar isMobile={isMobile} page={page}/>
      <PlainHeader isEdit={true}/>
      <RecordForm page={page} recordId={id}/>
    </Container>
  )
}

export default EditPage
