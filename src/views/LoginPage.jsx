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

const LoginTitle = styled.div`
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.mainTextColor};
  color: ${({ theme }) => theme.mainColor};
  font-size: 18px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
`

// ******** Main Function ******** //

function LoginPage() {
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
        toast('success', 'Login Success')
        return navigate('/income')
      } else {
        apiErrorHandler(res, 'Login Failed')
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
      <Header>Simple Expense Manager</Header>
      <Stack my={5} w='80%' maxW='500px' spacing={5}>
        <LoginTitle>Login</LoginTitle>

        <FormControl>
          <FormLabel>E-mail:</FormLabel>
          <Input 
            type='email'
            placeholder='Enter your e-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl isInvalid={!inputComplete}>
          <FormErrorMessage><InfoOutlineIcon mr={2}/>Please enter your email & password</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme='purple'
          onClick={handleLogin}
          isDisabled={!inputComplete}
        >Login</Button>

        <Text>
          No account?{' '}
          <Link color='teal.500' onClick={() => navigate('/register')}>
            Register
          </Link>
        </Text>


      </Stack>
    </Container>
  )
}

export default LoginPage
