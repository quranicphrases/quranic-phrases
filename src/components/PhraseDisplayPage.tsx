import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import PhraseCard from '../components/PhraseCard';
import PhraseModal from '../components/PhraseModal';
import type { PraisesData, QuranicPhrase } from '../types/praisesTypes';
import { formatReferences } from '../types/praisesTypes';

export interface PhraseDisplayPageProps {
  /** Main page title */
  pageTitle: string;
  /** About section title */
  aboutTitle: string;
  /** About section text content */
  aboutText: string;
  /** Array of phrases to display or PraisesData object */
  phrases: QuranicPhrase[] | PraisesData;
  /** Unique identifier prefix for accessibility IDs */
  idPrefix?: string;
  /** Section title for the phrases display area */
  sectionTitle: string;
  /** ARIA label for the phrases collection */
  collectionAriaLabel?: string;
  /** Custom click handler for reference badges */
  onReferenceClick?: (reference: string) => void;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
}

const PhraseDisplayPage: React.FC<PhraseDisplayPageProps> = ({
  pageTitle,
  aboutTitle,
  aboutText,
  phrases,
  idPrefix = 'phrase',
  sectionTitle,
  collectionAriaLabel,
  onReferenceClick,
  loading = false,
  error = null,
}) => {
  // Extract phrases array from either format
  const phrasesArray = Array.isArray(phrases) ? phrases : phrases.phrases;

  // Modal state
  const [selectedPhrase, setSelectedPhrase] = useState<QuranicPhrase | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Handle phrase card click
  const handlePhraseClick = (phrase: QuranicPhrase) => {
    setSelectedPhrase(phrase);
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    // Delay clearing selected phrase for smooth close animation
    setTimeout(() => setSelectedPhrase(null), 200);
  };

  // Default reference click handler
  const handleReferenceClick =
    onReferenceClick ||
    ((reference: string) => {
      console.log(`Navigating to reference: ${reference}`);
      // Could implement actual navigation to verse details or external Quran sites
    });

  // Generate unique IDs for accessibility
  const sectionTitleId = `${idPrefix}-section-title`;
  const defaultAriaLabel = `Collection of ${phrasesArray.length} Quranic phrases with translations`;

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
        {pageTitle}
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
          {aboutTitle}
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
          {aboutText}
        </Typography>
      </Paper>

      {/* Phrases Cards Section */}
      <Box
        component='section'
        aria-labelledby={sectionTitleId}
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography
          id={sectionTitleId}
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
          {sectionTitle}
        </Typography>

        {/* Loading State */}
        {loading && (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              backgroundColor: 'background.default',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant='h6' color='text.secondary'>
              Loading phrases...
            </Typography>
          </Paper>
        )}

        {/* Error State */}
        {error && !loading && (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              backgroundColor: 'error.light',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant='h6' color='error.dark' gutterBottom>
              Error Loading Phrases
            </Typography>
            <Typography variant='body1' color='error.dark'>
              {error}
            </Typography>
          </Paper>
        )}

        {/* Responsive Flexbox Grid for Phrase Cards */}
        {!loading && !error && phrasesArray.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, sm: 3, md: 4 },
              justifyContent: 'flex-start',
              alignItems: 'stretch',
            }}
            role='group'
            aria-label={collectionAriaLabel || defaultAriaLabel}
          >
            {phrasesArray.map((phrase, index) => (
              <Box
                key={`${idPrefix}-${index}`}
                onClick={() => handlePhraseClick(phrase)}
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
                  cursor: 'pointer',
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
                    edition: 'احمद علی',
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
                      cursor: 'pointer',
                    },
                    '&:focus-within': {
                      outline: '3px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                    },
                  }}
                  id={`${idPrefix}-${index + 1}`}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Phrase Modal */}
        {selectedPhrase && (
          <PhraseModal
            open={modalOpen}
            onClose={handleModalClose}
            phraseCardProps={{
              arabic: {
                text: selectedPhrase.arabicText,
                edition: 'القرآن الكريم',
                editionEnglish: 'The Holy Quran',
              },
              english: {
                text: selectedPhrase.englishText,
                edition: 'Sahih International',
              },
              hindi: {
                text: selectedPhrase.hindiText || 'Translation not available',
                edition: 'फारूकी',
                editionEnglish: 'Faruqi',
              },
              urdu: {
                text: selectedPhrase.urduText,
                edition: 'احمد علی',
                editionEnglish: 'Ahmed Ali',
              },
              references: formatReferences(selectedPhrase.references),
              onReferenceClick: handleReferenceClick,
            }}
          />
        )}

        {/* No Data State */}
        {!loading && !error && phrasesArray.length === 0 && (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              backgroundColor: 'background.default',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant='h6' color='text.secondary'>
              No phrases available at this time.
            </Typography>
          </Paper>
        )}

        {/* Screen Reader Summary */}
        {!loading && !error && phrasesArray.length > 0 && (
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
            Displaying {phrasesArray.length} Quranic phrases with Arabic text
            and translations in English, Hindi, and Urdu. Each card includes
            relevant verse references and can be navigated using keyboard or
            screen reader.
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PhraseDisplayPage;
