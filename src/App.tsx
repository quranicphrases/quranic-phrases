import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import SecondaryPraisesPage from './pages/SecondaryPraisesPage';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SecondaryPraisesPage />
    </ThemeProvider>
  );
}

export default App;
