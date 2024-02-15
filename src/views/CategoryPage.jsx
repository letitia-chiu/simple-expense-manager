import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import CategoryTable from '../components/CategoryTable'

const dummyCats = [
  { id: 1, name: 'Salary' },
  { id: 2, name: 'Bonus' }
]

function CategoryPage ({ isMobile }) {
  return (
    <Container>
      <Navbar isMobile={isMobile} page="category"/>
      <PlainHeader page="category"/>
      <Tabs isFitted variant='soft-rounded' colorScheme='purple' w='95%' maxW='960px'>
        <TabList mb={1} mt={5}>
          <Tab>Income</Tab>
          <Tab>Expense</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CategoryTable categories={dummyCats}/>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default CategoryPage
