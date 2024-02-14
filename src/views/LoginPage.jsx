import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Container from '../components/Container'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, Button, Stack, useToast
} from '@chakra-ui/react'


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
  // ** Input useState
  const [emailInput, setEmailInput] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [pwInvalid, setPwInvalid] = useState(false)

  // ** Error Handling
  const [isError, setIsError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const errToast = useToast()
  useEffect(() => {
    if (errMsg) {
      errToast({
        title: 'Error',
        description: errMsg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    setErrMsg('')
  }, [errMsg])

  // ** Input handlers
  const handleEmailInput = e => {
    setEmailInput(e.target.value)
    setEmailInvalid(false)
  }

  const handlePwInput = e => {
    setPwInput(e.target.value)
    setPwInvalid(false)
  }

  // ** Login function
  const handleLogin = async () => {
    // Validate user input
    if (!emailInput) return setEmailInvalid(true)
    if (!pwInput) return setPwInvalid(true)

    // Pack user input
    const payload = {
      email: emailInput,
      password: pwInput
    }

    // Login
    console.log('Login:', payload)
    setIsError(true)
    setErrMsg('Login failed!')
  }

  // ******** JSX return ******** //
  return (
    <Container>
      <Header>Simple Expense Manager</Header>
      <Stack my={5} w='80%' maxW='500px' spacing={5}>
        <LoginTitle>Login</LoginTitle>

        <FormControl isInvalid={emailInvalid}>
          <FormLabel>E-mail:</FormLabel>
          <Input 
            type='email'
            placeholder='Enter your e-mail'
            value={emailInput}
            onChange={handleEmailInput}
          />
          {emailInvalid && <FormErrorMessage>E-mail is required</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={pwInvalid}>
          <FormLabel>Password:</FormLabel>
          <Input
            type='password'
            placeholder='Enter your password'
            value={pwInput}
            onChange={handlePwInput}
          />
          {pwInvalid && <FormErrorMessage>Password is required</FormErrorMessage>}
        </FormControl>

        <Button
          colorScheme='purple'
          mt={5}
          onClick={handleLogin}
        >Login</Button>

      </Stack>
    </Container>
  )
}

export default LoginPage
