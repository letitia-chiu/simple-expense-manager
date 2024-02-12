import { ThemeProvider } from '@emotion/react'
import theme from './theme'

import Container from './components/Container'

function App() {
  return (
    <ThemeProvider theme={theme.light}>
      <div className="App">
        <Container>
          <p>Hello world</p>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
