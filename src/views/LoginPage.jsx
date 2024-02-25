import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, authCheck } from '../api/auth'
import { useApiErr } from '../utils/ApiErrorContext'
import styled from '@emotion/styled'
import Container from '../components/Container'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, Button, Stack, Text, Link
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { toast } from '../utils/helpers'
import toastMsg from '../utils/toast-messages'
import { FormattedMessage } from 'react-intl'
import LanguageSelector from '../components/LanguageSelector'

const Header = styled.div`
  background-color: ${({ theme }) => theme.foregroundColor};
  width: 100%;
  height: 60px;
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 18px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
  position: relative;
`

const LoginTitle = styled.div`
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.mainTextColor};
  color: ${({ theme }) => theme.mainColor};
  font-size: 18px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
`

const LangWrapper = styled.div`
  width: 260px;
  align-self: center;
`

// ******** Main Function ******** //

function LoginPage({ locale, setLocale }) {
  // ** useState & variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputComplete = email && password
  const navigate = useNavigate()
  const { apiErrorHandler } = useApiErr()

  // ** Login function
  const handleLogin = async () => {
    // Validate user input
    if (!inputComplete) return 

    // Login
    try {
      const res = await login(email, password)

      if (res.success) {
        toast('success', toastMsg.login[locale]?.success || 'Login Success')
        return navigate('/income')
      } else {
        apiErrorHandler(res, toastMsg.login[locale]?.fail ||'Login Failed')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  // ** If user is authenticated, redirect to income page
  useEffect(() => {
    const authCheckAsync = async () => {
      try {
        const res = await authCheck()
        if (res.success) return navigate('/income')
      } catch (err) {
        toast('error', err)
      }
    }
    authCheckAsync()
  }, [])

  // ******** JSX return ******** //
  return (
    <Container>
      <Header>
        <FormattedMessage
          id="app.title"
          defaultMessage="Simple Expense Manager"
        />
      </Header>

      <Stack my={5} w='80%' maxW='500px' spacing={5}>
        <LoginTitle>
          <FormattedMessage
            id="login"
            defaultMessage="Login"
          />
        </LoginTitle>

        <FormControl>
          <FormLabel>
            <FormattedMessage
              id="email.label"
              defaultMessage="E-mail"
            />:
          </FormLabel>
          <FormattedMessage 
            id="email.placeholder"
            defaultMessage="Enter your e-mail"
          >
            {msg => (
              <Input 
                type='email'
                placeholder={msg}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            )}
          </FormattedMessage>
        </FormControl>

        <FormControl>
          <FormLabel>
            <FormattedMessage
              id="password.label"
              defaultMessage="Password"
            />:
          </FormLabel>
          <FormattedMessage 
            id="password.placeholder"
            defaultMessage="Enter your password"
          >
            {msg => (
              <Input 
                type='password'
                placeholder={msg}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            )}
          </FormattedMessage>
        </FormControl>

        <FormControl isInvalid={!inputComplete}>
          <FormErrorMessage>
            <InfoOutlineIcon mr={2}/>
            <FormattedMessage
              id="login.formMsg.incomplete"
              defaultMessage="Please enter your email & password"     
            />
          </FormErrorMessage>
        </FormControl>

        <Button
          colorScheme='purple'
          onClick={handleLogin}
          isDisabled={!inputComplete}
        >
          <FormattedMessage
            id="login"
            defaultMessage="Login"
          />
        </Button>

        <Text>
          <FormattedMessage
            id="login.noAccount"
            defaultMessage="No account?"     
          />{' '}
          <Link color='teal.500' onClick={() => navigate('/register')}>
            <FormattedMessage
              id="register"
              defaultMessage="Register"
            />
          </Link>
        </Text>

        <LangWrapper>
          <LanguageSelector locale={locale} setLocale={setLocale}/>
        </LangWrapper>
      </Stack>
    </Container>
  )
}

export default LoginPage
