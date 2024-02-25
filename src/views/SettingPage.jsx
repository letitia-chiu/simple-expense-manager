import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button, Stack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { toast } from '../utils/helpers'
import toastMsg from '../utils/toast-messages'
import { FormattedMessage } from 'react-intl'

// Components
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import PlainHeader from '../components/PlainHeader'
import LanguageSelector from '../components/LanguageSelector'

const Wrapper = styled.div`
  flex: 1;
  width: 95%;
  max-width: 500px;
  margin-top: 10px;
  margin-bottom: 130px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

function SettingPage({ isMobile, switchTheme, theme, locale, setLocale }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: toastMsg.logout[locale]?.title || 'Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: toastMsg.logout[locale]?.logout || 'Logout',
      cancelButtonText: toastMsg.logout[locale]?.cancel || 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
        toast('success', toastMsg.logout[locale]?.success || "You've logout!")
        navigate('/login')
      }
    })
  }

  return (
    <Container>
      <Navbar isMobile={isMobile} page="setting"/>
      <PlainHeader page="setting"/>
      <Wrapper>
        <Stack w='90%' my={3} spacing={8}>
          {isMobile && 
            <Button 
            colorScheme='purple'
            variant='outline'
            onClick={() => navigate('/category')}
          >
            <FormattedMessage id="categories" defaultMessage="Categories"/>
          </Button>
          }
          <Button 
            colorScheme='purple'
            variant='outline'
            onClick={switchTheme}
          >{theme === 'light' ? <FormattedMessage id="mode.dark" defaultMessage="Dark mode"/> : <FormattedMessage id="mode.light" defaultMessage="Light mode"/>}</Button>
          <LanguageSelector locale={locale} setLocale={setLocale} size='md'/>
          <Button 
            colorScheme='gray'
            onClick={handleLogout}
          >
            <FormattedMessage id="logout" defaultMessage="Logout"/>
          </Button>
        </Stack>
      </Wrapper>
    </Container>
  )
}

export default SettingPage
