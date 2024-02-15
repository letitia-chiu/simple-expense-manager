import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import RecordForm from '../components/RecordForm'

function EditPage({ isMobile, type }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // ** Auth Check
  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [navigate, isAuthenticated])

  return (
    <Container>
      <Navbar isMobile={isMobile} page={type} />
      <PlainHeader isEdit={true} />
      <RecordForm type={type} recordId={id} />
    </Container>
  )
}

export default EditPage
