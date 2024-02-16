import { useParams } from 'react-router-dom'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import CategoryForm from '../components/CategoryForm'

function CategoryCreatePage({ isMobile }) {
  const { id } = useParams()
  const page = id ? 'editCategory' : 'createCategory'

  return (
    <Container>
      <Navbar isMobile={isMobile} page="category"/>
      <PlainHeader page={page}/>
      <CategoryForm categoryId={id && id !== 'create' ? id : null}/>
    </Container>
  )
}

export default CategoryCreatePage
