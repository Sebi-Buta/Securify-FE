import { CssBaseline, ThemeProvider } from '@mui/material'
import darkTheme from './utils/theme'

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
