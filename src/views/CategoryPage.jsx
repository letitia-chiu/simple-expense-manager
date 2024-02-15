import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import CategoryTable from '../components/CategoryTable'
import CategoryList from '../components/CategoryList'
import CreateButton from '../components/CreateButton'

const dummyCats = [
  { id: 1, name: 'Salary' },
  { id: 2, name: 'Bonus' }
]

function CategoryPage ({ isMobile }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [tab, setTab] = useState('income')

  // ** Auth Check
  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [navigate, isAuthenticated])

  return (
    <Container>
      {console.log(tab)}
      <Navbar isMobile={isMobile} page="category"/>
      <PlainHeader page="category"/>
      <Tabs isFitted variant='soft-rounded' colorScheme='purple' w='95%' maxW='960px'>
        <TabList mb={1} mt={5}>
          <Tab onClick={() => setTab('income')}>Income</Tab>
          <Tab onClick={() => setTab('expense')}>Expense</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isMobile ? <CategoryList categories={dummyCats}/> : <CategoryTable categories={dummyCats}/>}
          </TabPanel>
          <TabPanel>
            {isMobile ? <CategoryList categories={dummyCats}/> : <CategoryTable categories={dummyCats}/>}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <CreateButton link="#" title="Add Category"/>
    </Container>
  )
}

export default CategoryPage
