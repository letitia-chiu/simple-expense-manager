import { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'

// Components
import Container from './components/Container'
import Navbar from './components/Navbar'
import MonthlyHeader from './components/MonthlyHeader'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 960)
    }

    // Initial check
    checkScreenSize()
    // Set up event listener
    window.addEventListener('resize', checkScreenSize)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  return (
    <ThemeProvider theme={theme.light}>
      <div className="App">
        <Container>
          <Navbar isMobile={isMobile}/>
          <MonthlyHeader isMobile={isMobile}/>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
