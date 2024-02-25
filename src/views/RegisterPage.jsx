import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { register, authCheck } from '../api/auth'
import { useApiErr } from '../utils/ApiErrorContext'
import styled from '@emotion/styled'
import Container from '../components/Container'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, Button, Stack, Text, Link
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { toast } from '../utils/helpers'
import { FormattedMessage } from 'react-intl'
import LanguageSelector from '../components/LanguageSelector'
import toastMsg from '../utils/toast-messages'

const Header = styled.div`
  background-color: ${({ theme }) => theme.foregroundColor};
  width: 100%;
  height: 60px;
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 18px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
`

const RegisterTitle = styled.div`
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

function RegisterPage({ locale, setLocale }) {
  // ** useState & variables
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const inputComplete = email && name && password && confirmPassword
  const passwordMatch = password === confirmPassword
  const navigate = useNavigate()
  const { apiErrorHandler } = useApiErr()

  // ** Register function
  const handleRegister = async () => {
    // Validate user input
    if (!inputComplete) return
    if (!passwordMatch) return

    // Register
    const payload = { name, email, password, confirmPassword }
    try {
      const res = await register(payload)

      if (res.success) {
        toast('success', toastMsg.register[locale]?.success || 'Register Success')
        return navigate('/login')
      } else {
        apiErrorHandler(res, toastMsg.register[locale]?.fail || 'Register Failed')
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
        <RegisterTitle>
          <FormattedMessage
            id="register"
            defaultMessage="Register"
          />
        </RegisterTitle>

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
              id="username.label"
              defaultMessage="Username"
            />:
          </FormLabel>
          <FormattedMessage 
            id="username.placeholder"
            defaultMessage="Enter your username"
          >
            {msg => (
              <Input 
                type='text'
                placeholder={msg}
                value={name}
                onChange={e => setName(e.target.value)}
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

        <FormControl isInvalid={!passwordMatch}>
          <FormLabel>
            <FormattedMessage
              id="confirmPw.label"
              defaultMessage="Confirm Password"
            />:
          </FormLabel>
          <FormattedMessage 
            id="confirmPw.placeholder"
            defaultMessage="Enter password again"
          >
            {msg => (
              <Input 
                type='password'
                placeholder={msg}
                value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
              />
            )}
          </FormattedMessage>
          <FormErrorMessage>
            <FormErrorMessage>
            <InfoOutlineIcon mr={2}/>
            <FormattedMessage
              id="register.formMsg.notMatch"
              defaultMessage="Passwords do not match"     
            />
          </FormErrorMessage>
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!inputComplete}>
          <FormErrorMessage>
            <InfoOutlineIcon mr={2}/>
            <FormattedMessage
              id="register.formMsg.incomplete"
              defaultMessage="Email, username, password are required"     
            />
          </FormErrorMessage>
        </FormControl>

        <Button
          colorScheme='purple'
          onClick={handleRegister}
          isDisabled={!inputComplete || !passwordMatch}
        >
          <FormattedMessage
            id="register"
            defaultMessage="Register"
          />
        </Button>

        <Text>
          <FormattedMessage
            id="register.haveAccount"
            defaultMessage="Already have an account?"     
          />{' '}
          <Link color='teal.500' onClick={() => navigate('/login')}>
            <FormattedMessage
              id="login"
              defaultMessage="Login"
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

export default RegisterPage
