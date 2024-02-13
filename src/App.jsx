import { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'

// Views
import IncomeListPage from './views/IncomeListPage'

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
        <IncomeListPage isMobile={isMobile} />
      </div>
    </ThemeProvider>
  )
}

export default App
