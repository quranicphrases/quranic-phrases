import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import ListOfPages from './components/layout/ListOfPages';
import KeyboardGuide from './components/layout/KeyboardGuide';
import OverviewPage from './pages/OverviewPage';
import NamesPage from './pages/NamesPage';
import AnonymousPage from './pages/AnonymousPage';
import PraisesPage from './pages/PraisesPage';
import InfoPage from './pages/InfoPage';
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
              <Route path='/99-names' element={<NamesPage />} />
              <Route path='/praises' element={<PraisesPage />} />
              <Route path='/prayers' element={<PrayersPage />} />
              <Route path='/info' element={<InfoPage />} />
              <Route path='/anonymous' element={<AnonymousPage />} />

              {/* Fallback route for unknown paths */}
              <Route path='*' element={<Navigate to='/overview' replace />} />
            </Routes>
          </Box>

          {/* Keyboard Navigation Guide - Shows on first visit */}
          <KeyboardGuide showOnMount={true} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
