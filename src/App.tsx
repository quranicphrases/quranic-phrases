import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import PraisesPage from './pages/PraisesPage';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PraisesPage />
    </ThemeProvider>
  );
}

export default App;
