import { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

// Views
import IncomeListPage from './views/IncomeListPage'
import ExpenseListPage from './views/ExpenseListPage'
import CreatePage from './views/CreatePage'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 960)
    }

    // Initial check screen size
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
        <BrowserRouter>
          <Routes>
            <Route
              path="/income/create"
              element={<CreatePage isMobile={isMobile} page="income" />}
            />
            <Route
              path="/income"
              element={<IncomeListPage isMobile={isMobile} />}
            />
            <Route
              path="/expense/create"
              element={<CreatePage isMobile={isMobile} page="expense" />}
            />
            <Route
              path="/expense"
              element={<ExpenseListPage isMobile={isMobile} />}
            />
            <Route
              path="*"
              element={<div>Simple Expense Manager</div>}
            />
          </Routes>
        </BrowserRouter>
        
      </div>
    </ThemeProvider>
  )
}

export default App
