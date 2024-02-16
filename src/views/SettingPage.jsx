import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import styled from '@emotion/styled'
import { Button, Stack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { toast } from '../utils/helpers'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'

const Wrapper = styled.div`
  flex: 1;
  width: 95%;
  margin-top: 10px;
  margin-bottom: 130px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

function SettingPage({ isMobile }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
        toast('success', "You've logout!")
        navigate('/login')
      }
    })
  }
  
  useEffect(() => {
    if (!isMobile) {
      navigate('/category')
    }
  }, [isMobile])

  return (
    <Container>
      <Navbar isMobile={isMobile} page="setting"/>
      <PlainHeader page="setting"/>
      <Wrapper>
        <Stack w='90%' my={3} spacing={8}>
          <Button 
            colorScheme='purple'
            variant='outline'
            onClick={() => navigate('/category')}
          >Category</Button>
          <Button 
            colorScheme='gray'
            onClick={handleLogout}
          >Logout</Button>
        </Stack>
      </Wrapper>
    </Container>
  )
}

export default SettingPage
