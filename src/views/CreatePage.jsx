import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import RecordForm from '../components/RecordForm'

function CreatePage({ isMobile, type }) {
  const navigate = useNavigate()
  const { isAuthenticated, currentUser } = useAuth()

  // ** Auth Check
  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [navigate, isAuthenticated])

  return (
    <Container>
      <Navbar isMobile={isMobile} page={type}/>
      <PlainHeader page={type}/>
      <RecordForm type={type} />
    </Container>
  )
}

export default CreatePage
