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

// ******** Main Function ******** //

function RegisterPage() {
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
        toast('success', 'Register Success')
        return navigate('/login')
      } else {
        apiErrorHandler(res, 'Register Failed')
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
        <RegisterTitle>Register</RegisterTitle>

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
          <FormLabel>Username:</FormLabel>
          <Input 
            type='text'
            placeholder='Enter your username'
            value={name}
            onChange={e => setName(e.target.value)}
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

        <FormControl isInvalid={!passwordMatch}>
          <FormLabel>Confirm Password:</FormLabel>
          <Input
            type='password'
            placeholder='Enter password again'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <FormErrorMessage><InfoOutlineIcon mr={2}/>Passwords do not match</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!inputComplete}>
          <FormErrorMessage><InfoOutlineIcon mr={2}/>Email, username, password are required</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme='purple'
          onClick={handleRegister}
          isDisabled={!inputComplete || !passwordMatch}
        >Register</Button>

        <Text>
          Already have an account?{' '}
          <Link color='teal.500' onClick={() => navigate('/login')}>
            Login
          </Link>
        </Text>

      </Stack>
    </Container>
  )
}

export default RegisterPage
