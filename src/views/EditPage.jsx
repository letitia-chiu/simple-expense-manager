import { useParams } from 'react-router-dom'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import RecordForm from '../components/RecordForm'

function EditPage({ isMobile, type }) {
  const { id } = useParams()

  return (
    <Container>
      <Navbar isMobile={isMobile} />
      <PlainHeader isEdit={true} />
      <RecordForm type={type} recordId={id} />
    </Container>
  )
}

export default EditPage
