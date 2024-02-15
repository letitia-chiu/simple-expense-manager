import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import CategoryForm from '../components/CategoryForm'

function CategoryCreatePage({ isMobile }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // ** Auth Check
  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [navigate, isAuthenticated])

  return (
    <Container>
      <Navbar isMobile={isMobile} page="category"/>
      <PlainHeader page="createCategory"/>
      <CategoryForm />
    </Container>
  )
}

export default CategoryCreatePage
