import {
  Container,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import PhraseCard from './components/PhraseCard';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth='xs'
        sx={{
          py: 1,
          px: 0.5,
        }}
      >
        <Typography
          variant='h4'
          component='h1'
          align='center'
          gutterBottom
          sx={{ mb: 3 }}
        >
          Quranic Phrases
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <PhraseCard
            arabic={{
              text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
              edition: 'القرآن الكريم',
              editionEnglish: 'The Holy Quran',
            }}
            english={{
              text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
              edition: 'Sahih International',
            }}
            hindi={{
              text: 'अल्लाह के नाम से जो अत्यंत कृपालु और दयावान है',
              edition: 'फारूकी',
              editionEnglish: 'Faruqi',
            }}
            urdu={{
              text: 'اللہ کے نام سے جو نہایت مہربان اور رحم والا ہے',
              edition: 'احمد علی',
              editionEnglish: 'Ahmed Ali',
            }}
            references={['1:1', '112:1', '113:1', '114:1']}
            onReferenceClick={reference =>
              console.log(`Reference clicked: ${reference}`)
            }
            elevation={2}
            sx={{
              maxWidth: '100%',
              width: '100%',
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
