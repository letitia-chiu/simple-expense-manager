import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { getCategories } from '../api/category'
import { toast } from '../utils/helpers'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import CategoryTable from '../components/CategoryTable'
import CategoryList from '../components/CategoryList'
import CreateButton from '../components/CreateButton'


function CategoryPage ({ isMobile }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [tab, setTab] = useState('income')
  const [categories, setCategories] = useState([])

  // ** Async function
  const getCategoriesAsync = async (type) => {
    try {
      const res = await getCategories(type)
      if (res.success) return setCategories(res.categories)

      // Handle error message
      const message = res.message || ''
      toast('error', 'Loading Failed', message)
    } catch (err) {
      toast('error', err)
    }
  }

  // ** Auth Check
  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [navigate, isAuthenticated])

  // ** Get data from API when page first loads
  useEffect(() => {
    getCategoriesAsync(tab)
  }, [tab])

  return (
    <Container>
      <Navbar isMobile={isMobile} page="category"/>
      <PlainHeader page="category"/>
      <Tabs isFitted variant='soft-rounded' colorScheme='purple' w='95%' maxW='960px'>
        <TabList mb={1} mt={5}>
          <Tab onClick={() => setTab('income')}>Income</Tab>
          <Tab onClick={() => setTab('expense')}>Expense</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isMobile ? <CategoryList categories={categories}/> : <CategoryTable categories={categories}/>}
          </TabPanel>
          <TabPanel>
            {isMobile ? <CategoryList categories={categories}/> : <CategoryTable categories={categories}/>}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <CreateButton link="/category/create" title="Add Category"/>
    </Container>
  )
}

export default CategoryPage
