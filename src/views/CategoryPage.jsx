import { useState, useEffect } from 'react'
import { getCategories } from '../api/category'
import { useApiErr } from '../utils/ApiErrorContext'
import { toast } from '../utils/helpers'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import styled from '@emotion/styled'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import CategoryTable from '../components/CategoryTable'
import CategoryList from '../components/CategoryList'
import CreateButton from '../components/CreateButton'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 130px;
  padding: 0 8% 15vw;
  display: flex;
  justify-content: center;
  position: relative;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 960px) {
    margin-bottom: 20px;
  }
`

function CategoryPage ({ isMobile }) {
  const [tab, setTab] = useState('income')
  const [categories, setCategories] = useState([])
  const { apiErrorHandler } = useApiErr()

  // ** Async function
  const getCategoriesAsync = async (type) => {
    try {
      const res = await getCategories(type)
      if (res.success) {
        setCategories(res.categories)
      } else {
        apiErrorHandler(res)
      }
    } catch (err) {
      toast('error', err)
    }
  }

  // ** Get data from API when page first loads
  useEffect(() => {
    getCategoriesAsync(tab)
  }, [tab])

  return (
    <Container>
      <Navbar isMobile={isMobile} page="category"/>
      <PlainHeader page="category"/>
      <Wrapper>
        <Tabs isFitted variant='soft-rounded' colorScheme='purple' w='95%' maxW='960px'>
          <TabList mb={1} mt={5} position='sticky'>
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
      </Wrapper>
      <CreateButton link="/category/create" title="Add Category"/>
    </Container>
  )
}

export default CategoryPage
