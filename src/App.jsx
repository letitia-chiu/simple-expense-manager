import { ThemeProvider } from '@emotion/react'
import theme from './theme'

// Components
import Container from './components/Container'
import Navbar from './components/Navbar'

function App() {
  return (
    <ThemeProvider theme={theme.light}>
      <div className="App">
        <Container>
          <Navbar />
          <p>Hello world</p>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
