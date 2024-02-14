import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Container from '../components/Container'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, Button, Stack
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'
import { login } from '../api/auth'

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

const toast = (status, title, text) => {
  if (!status) return

  Swal.fire({
    toast: true,
    position: "top",
    icon: status,
    title: title || status,
    text: text || null,
    showConfirmButton: false,
    showCloseButton: true,
    timer: status === 'success' ? 1500 : 9000
  })
}

// ******** Main Function ******** //

function LoginPage() {
  // ** useState & variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputComplete = email && password
  const navigate = useNavigate()

  // ** Login function
  const handleLogin = async () => {
    // Validate user input
    if (!inputComplete) return 

    // Login
    try {
      const res = await login(email, password)

      if (res.success) {
        console.log(res.user)
        toast('success', 'Login Success')
        return navigate('/income')
      } else {
        const message = res.message || ''
        toast('error', 'Login Failed', message)
      }
    } catch (err) {
      console.error(err)
    }
  }

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

      </Stack>
    </Container>
  )
}

export default LoginPage
