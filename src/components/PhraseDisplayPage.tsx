import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import PhraseCard from '../components/PhraseCard';
import PhraseModalEnhanced from '../components/PhraseModalEnhanced';
import type { PraisesData, QuranicPhrase } from '../types/praisesTypes';
import { formatReferences } from '../types/praisesTypes';
import { navigateToQuranReference } from '../utils/quranReference';

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

  // Refs for focus management
  const mainContentRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const phrasesGridRef = useRef<HTMLDivElement>(null);

  // Card focus and selection state
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  // Modal state
  const [selectedPhrase, setSelectedPhrase] = useState<QuranicPhrase | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Update focus when focusedCardIndex changes
  useEffect(() => {
    console.log(
      '🔄 useEffect triggered - focusedCardIndex changed to:',
      focusedCardIndex
    );
    if (phrasesGridRef.current && focusedCardIndex >= 0) {
      // Use a more specific selector to get only phrase cards
      const cards =
        phrasesGridRef.current.querySelectorAll('[data-phrase-card]');
      console.log(
        '📦 Found cards:',
        cards.length,
        'Trying to focus index:',
        focusedCardIndex
      );
      if (cards[focusedCardIndex]) {
        (cards[focusedCardIndex] as HTMLElement).focus();
        console.log('✅ Focused card:', focusedCardIndex);
      } else {
        console.log('❌ Card not found at index:', focusedCardIndex);
      }
    } else {
      console.log('⚠️ Grid ref not available or invalid index');
    }
  }, [focusedCardIndex]);

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
  const handleReferenceClick = onReferenceClick || navigateToQuranReference;

  // Handle arrow key navigation in phrase grid
  const handleGridKeyDown = (
    event: React.KeyboardEvent,
    currentIndex: number
  ) => {
    console.log('🎯 handleGridKeyDown called:', {
      key: event.key,
      currentIndex,
      focusedCardIndex,
      totalCards: phrasesArray.length,
    });

    const totalCards = phrasesArray.length;
    let newIndex = currentIndex;
    let handled = false;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        // Move to next card (sequential, left to right, top to bottom)
        event.preventDefault();
        newIndex = currentIndex + 1;
        if (newIndex >= totalCards) {
          newIndex = totalCards - 1; // Stay on last card
        }
        handled = true;
        console.log('➡️ Moving right/down to:', newIndex);
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        // Move to previous card (sequential, right to left, bottom to top)
        event.preventDefault();
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = 0; // Stay on first card
        }
        handled = true;
        console.log('⬅️ Moving left/up to:', newIndex);
        break;

      case 'Home':
        event.preventDefault();
        newIndex = 0;
        handled = true;
        console.log('🏠 Moving to Home (0)');
        break;

      case 'End':
        event.preventDefault();
        newIndex = totalCards - 1;
        handled = true;
        console.log('🔚 Moving to End:', newIndex);
        break;

      case 'Escape':
        // Exit selection mode
        event.preventDefault();
        setSelectedCardIndex(null);
        console.log('🚪 Escape - clearing selection');
        return;

      default:
        console.log('❌ Unhandled key:', event.key);
        return;
    }

    // Update focused index - useEffect will handle actual focus
    if (handled && newIndex !== currentIndex) {
      console.log(
        '✅ Updating focusedCardIndex from',
        currentIndex,
        'to',
        newIndex
      );
      setFocusedCardIndex(newIndex);
    } else {
      console.log('⚠️ No change:', { handled, newIndex, currentIndex });
    }
  };

  // Generate unique IDs for accessibility
  const sectionTitleId = `${idPrefix}-section-title`;
  const aboutSectionId = `${idPrefix}-about-section`;
  const defaultAriaLabel = `Collection of ${phrasesArray.length} Quranic phrases with translations`;

  return (
    <Container
      maxWidth={false}
      ref={mainContentRef}
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
      {/* Skip to main content link - visually hidden but accessible */}
      <Box
        component='a'
        href='#main-content'
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          padding: '1rem',
          backgroundColor: 'primary.main',
          color: 'white',
          textDecoration: 'none',
          borderRadius: 1,
          '&:focus': {
            left: '1rem',
            top: '1rem',
          },
        }}
      >
        Skip to main content
      </Box>

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
        id={aboutSectionId}
        ref={aboutSectionRef}
        tabIndex={0}
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
          mb: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          width: '100%',
          maxWidth: '100%',
          mx: { xs: 0, xl: 'auto' },
          '&:focus': {
            outline: '3px solid',
            outlineColor: 'primary.main',
            outlineOffset: '2px',
          },
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
          component='div'
          lang='en'
          sx={{
            lineHeight: 1.8,
            color: 'text.primary',
            textAlign: 'justify',
            whiteSpace: 'pre-line',
          }}
          role='region'
          aria-label={aboutTitle}
        >
          {aboutText}
        </Typography>
      </Paper>

      {/* Phrases Cards Section */}
      <Box
        component='section'
        id='main-content'
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
            ref={phrasesGridRef}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, sm: 3, md: 4 },
              justifyContent: 'flex-start',
              alignItems: 'stretch',
            }}
            role='grid'
            aria-label={collectionAriaLabel || defaultAriaLabel}
          >
            {phrasesArray.map((phrase, index) => (
              <Box
                data-phrase-card='true'
                key={`${idPrefix}-${index}`}
                onClick={() => handlePhraseClick(phrase)}
                onKeyDown={e => {
                  console.log('⌨️ Card onKeyDown:', {
                    key: e.key,
                    cardIndex: index,
                    focusedCardIndex,
                    hasTabIndex: index === focusedCardIndex ? 0 : -1,
                  });

                  if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log(
                      '🎯 Enter pressed - opening modal for card:',
                      index
                    );
                    handlePhraseClick(phrase);
                  } else if (e.key === ' ') {
                    e.preventDefault();
                    console.log('⭐ Space pressed - selecting card:', index);
                    setSelectedCardIndex(index);
                  } else {
                    console.log(
                      '🔀 Arrow key detected, calling handleGridKeyDown'
                    );
                    handleGridKeyDown(e, index);
                  }
                }}
                tabIndex={index === focusedCardIndex ? 0 : -1}
                role='button'
                aria-label={`Phrase ${index + 1} of ${
                  phrasesArray.length
                }. ${phrase.arabicText.substring(
                  0,
                  50
                )}... Press Enter to open modal, Space to select, arrow keys to navigate.`}
                aria-pressed={selectedCardIndex === index}
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
                  '&:focus': {
                    outline: '3px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '4px',
                    borderRadius: '4px',
                  },
                  ...(selectedCardIndex === index && {
                    outline: '3px dashed',
                    outlineColor: 'secondary.main',
                    outlineOffset: '4px',
                    backgroundColor: 'action.selected',
                  }),
                }}
              >
                <PhraseCard
                  arabic={{
                    text: phrase.arabicText,
                    edition: 'القرآن الكريم',
                  }}
                  english={{
                    text: phrase.englishText,
                    edition: 'Sahih International',
                  }}
                  hindi={{
                    text: phrase.hindiText || 'Translation not available',
                    edition: 'फ़ारूकी',
                  }}
                  urdu={{
                    text: phrase.urduText,
                    edition: 'احمد علی',
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
          <PhraseModalEnhanced
            open={modalOpen}
            onClose={handleModalClose}
            phraseCardProps={{
              arabic: {
                text: selectedPhrase.arabicText,
                edition: 'القرآن الكريم',
              },
              english: {
                text: selectedPhrase.englishText,
                edition: 'Sahih International',
              },
              hindi: {
                text: selectedPhrase.hindiText || 'Translation not available',
                edition: 'फ़ारूकी',
              },
              urdu: {
                text: selectedPhrase.urduText,
                edition: 'احمد علی',
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
