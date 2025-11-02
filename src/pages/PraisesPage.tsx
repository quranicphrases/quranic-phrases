import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { aboutPraisesText } from '../assets/aboutPraisesText';
import praisesData from '../assets/praises.json';
import PhraseCard from '../components/PhraseCard';
import type { PraisesData } from '../types/praisesTypes';
import { formatReferences } from '../types/praisesTypes';

const PraisesPage: React.FC = () => {
  // Type assertion for imported JSON data
  const { phrases } = praisesData as PraisesData;

  // Handle reference click for accessibility and user interaction
  const handleReferenceClick = (reference: string) => {
    console.log(`Navigating to reference: ${reference}`);
    // Could implement actual navigation to verse details or external Quran sites
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 3,
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: { xs: '100%', xl: '95%' },
        width: '100%',
      }}
    >
      {/* Page Title */}
      <Typography
        variant='h3'
        component='h1'
        align='center'
        gutterBottom
        sx={{
          mb: 4,
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        Praises from the Quran
      </Typography>

      {/* About Section */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
          mb: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          width: '100%',
          maxWidth: '100%',
          mx: { xs: 0, xl: 'auto' },
        }}
      >
        <Typography
          variant='h5'
          component='h2'
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 'medium',
            mb: 3,
          }}
        >
          About Quranic Praises
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant='body1'
          sx={{
            lineHeight: 1.8,
            color: 'text.primary',
            textAlign: 'justify',
            whiteSpace: 'pre-line',
          }}
        >
          {aboutPraisesText}
        </Typography>
      </Paper>

      {/* Phrases Cards Section */}
      <Box
        component='section'
        aria-labelledby='phrases-section-title'
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography
          id='phrases-section-title'
          variant='h4'
          component='h2'
          align='center'
          gutterBottom
          sx={{
            mb: 4,
            color: 'primary.main',
            fontWeight: 'medium',
          }}
        >
          Quranic Praise Phrases
        </Typography>

        {/* Responsive Flexbox Grid for Phrase Cards */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 3, md: 4 },
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}
          role='group'
          aria-label={`Collection of ${phrases.length} Quranic praise phrases with translations`}
        >
          {phrases.map((phrase, index) => (
            <Box
              key={`phrase-${index}`}
              sx={{
                flex: {
                  xs: '1 1 100%', // Mobile: 1 card per row
                  sm: '1 1 calc(50% - 12px)', // Tablet: 2 cards per row
                  md: '1 1 calc(33.333% - 16px)', // Small desktop: 3 cards per row
                  lg: '1 1 calc(25% - 18px)', // Large desktop: 4 cards per row
                  xl: '1 1 calc(20% - 19.2px)', // Extra large: 5 cards per row
                },
                minWidth: { xs: '280px', sm: '320px' }, // Ensure minimum readable width
                maxWidth: '100%',
              }}
            >
              <PhraseCard
                arabic={{
                  text: phrase.arabicText,
                  edition: 'القرآن الكريم',
                  editionEnglish: 'The Holy Quran',
                }}
                english={{
                  text: phrase.englishText,
                  edition: 'Sahih International',
                }}
                hindi={{
                  text: phrase.hindiText || 'Translation not available',
                  edition: 'फारूकी',
                  editionEnglish: 'Faruqi',
                }}
                urdu={{
                  text: phrase.urduText,
                  edition: 'احمد علی',
                  editionEnglish: 'Ahmed Ali',
                }}
                references={formatReferences(phrase.references)}
                onReferenceClick={handleReferenceClick}
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    elevation: 4,
                    transform: 'translateY(-2px)',
                  },
                  '&:focus-within': {
                    outline: '3px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                  },
                }}
                id={`praise-phrase-${index + 1}`}
              />
            </Box>
          ))}
        </Box>

        {/* Screen Reader Summary */}
        <Box
          sx={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
          aria-live='polite'
        >
          Displaying {phrases.length} Quranic praise phrases with Arabic text
          and translations in English, Hindi, and Urdu. Each card includes
          relevant verse references and can be navigated using keyboard or
          screen reader.
        </Box>
      </Box>
    </Container>
  );
};

export default PraisesPage;
