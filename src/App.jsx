import { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme } from './utils/theme'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ApiErrProvider } from './utils/ApiErrorContext'
import { useColorMode } from '@chakra-ui/react'

// Language resources
import { IntlProvider } from 'react-intl'
import en from './i18n/en.js'
import zh from './i18n/zh.js'
import ja from './i18n/ja.js'

// Views
import RecordListPage from './views/RecordListPage'
import CreatePage from './views/CreatePage'
import EditPage from './views/EditPage'
import LoginPage from './views/LoginPage'
import CategoryPage from './views/CategoryPage'
import CategoryFormPage from './views/CategoryFormPage'
import SettingPage from './views/SettingPage'
import ReportPage from './views/ReportPage'
import RegisterPage from './views/RegisterPage'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [locale, setLocale] = useState(() => localStorage.getItem('lang') || navigator.language)
  const { colorMode, toggleColorMode } = useColorMode()
  
  // ** Language setting
  let messages
  if (locale.includes('zh')) {
    messages = zh
  } else if (locale.includes('ja')) {
    messages = ja
  } else {
    messages = en
  }

  const handleSetLocale = lang => {
    setLocale(lang)
    localStorage.setItem('lang', lang)
  }

  const handleThemeSwitch = () => {
    const theme = colorMode === 'light' ? 'dark' : 'light'
    if (currentTheme !== colorMode) {
      toggleColorMode()
    }
    setCurrentTheme(theme)
    toggleColorMode()
    localStorage.setItem('theme', theme)
  }
  
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
    <IntlProvider locale={locale} key={locale} defaultLocale="en" messages={messages}>
    <ThemeProvider theme={theme[currentTheme]}>
      <div className="App">
        <HashRouter>
          <ApiErrProvider>
            <Routes>
              <Route
                path="/register"
                element={<RegisterPage locale={locale} setLocale={handleSetLocale}/>}
              />
              <Route
                path="/login"
                element={<LoginPage locale={locale} setLocale={handleSetLocale}/>}
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
                element={<SettingPage 
                  isMobile={isMobile} 
                  switchTheme={handleThemeSwitch} 
                  theme={currentTheme} 
                  locale={locale}
                  setLocale={handleSetLocale}
                />}
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
        </HashRouter>
        
      </div>
    </ThemeProvider>
    </IntlProvider>
  )
}

export default App
