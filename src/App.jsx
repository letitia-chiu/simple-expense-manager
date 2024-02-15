import { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from './utils/theme'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

// Views
import RecordListPage from './views/RecordListPage'
import CreatePage from './views/CreatePage'
import EditPage from './views/EditPage'
import LoginPage from './views/LoginPage'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  
  // ** Screen size check
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
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/income/create"
              element={<CreatePage isMobile={isMobile} type="income" />}
            />
            <Route
              path="/income/:id/edit"
              element={<EditPage isMobile={isMobile} type="income" />}
            />
            <Route
              path="/income"
              element={<RecordListPage isMobile={isMobile} type="income" />}
            />
            <Route
              path="/expense/create"
              element={<CreatePage isMobile={isMobile} type="expense" />}
            />
            <Route
              path="/expense/:id/edit"
              element={<EditPage isMobile={isMobile} type="expense" />}
            />
            <Route
              path="/expense"
              element={<RecordListPage isMobile={isMobile} type="expense" />}
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
