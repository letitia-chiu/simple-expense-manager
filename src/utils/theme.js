import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: localStorage.getItem('theme') || 'light',
  useSystemColorMode: false,
}

export const chakraTheme = extendTheme({ config })

export const theme = {
  light: {
    backgroundColor: '#F7FAFC',
    foregroundColor: '#E9D8FD',
    mainColor: '#6B46C1',
    subColor: '#4A5568',
    mainTextColor: '#4A5568',
    subTextColor: '#718096',
    borderColor: '#CBD5E0'
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    mainColor: '#e4e4e4',
    subColor: '#969696',
    mainTextColor: '#e4e4e4',
    subTextColor: '#969696',
    borderColor: '#CBD5E0'
  }
}
