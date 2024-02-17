import { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from './utils/theme'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ApiErrProvider } from './utils/ApiErrorContext'

// Views
import RecordListPage from './views/RecordListPage'
import CreatePage from './views/CreatePage'
import EditPage from './views/EditPage'
import LoginPage from './views/LoginPage'
import CategoryPage from './views/CategoryPage'
import CategoryFormPage from './views/CategoryFormPage'
import SettingPage from './views/SettingPage'
import ReportPage from './views/ReportPage'

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
          <ApiErrProvider>
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
                path="/category/create"
                element={<CategoryFormPage isMobile={isMobile} />}
              />
              <Route
                path="/category/:id/edit"
                element={<CategoryFormPage isMobile={isMobile} />}
              />
              <Route
                path="/category"
                element={<CategoryPage isMobile={isMobile} />}
              />
              <Route
                path='/setting'
                element={<SettingPage isMobile={isMobile}/>}
              />
              <Route
                path='/report'
                element={<ReportPage isMobile={isMobile} />}
              />
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </Routes>
          </ApiErrProvider>
        </BrowserRouter>
        
      </div>
    </ThemeProvider>
  )
}

export default App
