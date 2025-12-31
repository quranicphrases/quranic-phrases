import { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import AboutSection from '../features/phrases/components/AboutSection';
import PhrasesGrid from '../features/phrases/components/PhrasesGrid';
import PhraseModal from '../features/phrases/components/PhraseModal';
import DataState from '../components/ui/DataState';
import type {
  PraisesData,
  QuranicPhrase,
} from '../features/phrases/types/praisesTypes';
import { formatReferences } from '../features/phrases/types/praisesTypes';
import { navigateToQuranReference } from '../features/references/utils/quranReference';

export interface PhrasePageTemplateProps {
  pageTitle: string;
  aboutTitle: string;
  aboutText: string;
  phrases: QuranicPhrase[] | PraisesData;
  idPrefix?: string;
  sectionTitle: string;
  collectionAriaLabel?: string;
  onReferenceClick?: (reference: string) => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Template component for phrase display pages
 * Composes AboutSection, PhrasesGrid, and PhraseModal components
 * Handles loading, error, and empty states
 */
export default function PhrasePageTemplate({
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
}: PhrasePageTemplateProps) {
  // Extract phrases array from either format
  const phrasesArray = Array.isArray(phrases) ? phrases : phrases.phrases;

  // Refs for focus management
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [selectedPhrase, setSelectedPhrase] = useState<QuranicPhrase | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Focus AboutSection when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (aboutSectionRef.current) {
        aboutSectionRef.current.focus();
        aboutSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Handle phrase card click
  const handlePhraseClick = (phrase: QuranicPhrase) => {
    setSelectedPhrase(phrase);
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedPhrase(null), 200);
  };

  // Default reference click handler
  const handleReferenceClick = onReferenceClick || navigateToQuranReference;

  // Generate unique IDs for accessibility
  const sectionTitleId = `${idPrefix}-section-title`;
  const aboutSectionId = `${idPrefix}-about-section`;

  // Handle skip link click
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    aboutSectionRef.current?.focus();
    mainContent?.scrollIntoView({ behavior: 'smooth' });
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
      {/* Skip to main content link */}
      <Box
        component='a'
        href='#main-content'
        onClick={handleSkipToContent}
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
      <AboutSection
        ref={aboutSectionRef}
        id={aboutSectionId}
        title={aboutTitle}
        text={aboutText}
      />

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

        {/* Data States: Loading, Error, Empty, or Content */}
        <DataState
          loading={loading}
          error={error}
          isEmpty={phrasesArray.length === 0}
          emptyMessage='No phrases available at this time.'
        >
          <PhrasesGrid
            phrases={phrasesArray}
            idPrefix={idPrefix}
            ariaLabel={collectionAriaLabel}
            onPhraseClick={handlePhraseClick}
            onReferenceClick={handleReferenceClick}
            aboutSectionRef={aboutSectionRef}
          />
        </DataState>
      </Box>

      {/* Phrase Modal */}
      {selectedPhrase && (
        <PhraseModal
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
    </Container>
  );
}
