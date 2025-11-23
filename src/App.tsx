import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import ListOfPages from './components/ListOfPages';
import OverviewPage from './pages/OverviewPage';
import AnonymousPage from './pages/AnonymousPage';
import PraisesPage from './pages/PraisesPage';
import SecondaryPraisesPage from './pages/SecondaryPraisesPage';
import PrayersPage from './pages/PrayersPage';
import { pages } from './config/navigationConfig';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Navigation */}
          <ListOfPages pages={pages} />

          {/* Main Content */}
          <Box
            component='main'
            role='main'
            sx={{
              flexGrow: 1,
              width: '100%',
            }}
          >
            <Routes>
              {/* Default route redirects to overview */}
              <Route path='/' element={<Navigate to='/overview' replace />} />

              {/* Page routes */}
              <Route path='/overview' element={<OverviewPage />} />
              <Route path='/anonymous' element={<AnonymousPage />} />
              <Route path='/praises' element={<PraisesPage />} />
              <Route
                path='/extended-praises'
                element={<SecondaryPraisesPage />}
              />
              <Route path='/prayers' element={<PrayersPage />} />

              {/* Fallback route for unknown paths */}
              <Route path='*' element={<Navigate to='/overview' replace />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
