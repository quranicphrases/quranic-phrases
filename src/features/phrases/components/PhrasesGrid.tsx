import { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import PhraseCard from './PhraseCard';
import ScreenReaderAnnouncement from '../../../components/ui/ScreenReaderAnnouncement';
import type { QuranicPhrase } from '../types/praisesTypes';
import { formatReferences } from '../types/praisesTypes';

interface PhrasesGridProps {
  phrases: QuranicPhrase[];
  idPrefix?: string;
  ariaLabel?: string;
  onPhraseClick: (phrase: QuranicPhrase) => void;
  aboutSectionRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Grid display component for Quranic phrases with keyboard navigation
 * Supports arrow keys, Home, End for navigation between cards
 */
export default function PhrasesGrid({
  phrases,
  idPrefix = 'phrase',
  ariaLabel,
  onPhraseClick,
  aboutSectionRef,
}: PhrasesGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(0);
  const [announcement, setAnnouncement] = useState('');
  const [shouldFocusCard, setShouldFocusCard] = useState(false);

  // Update focus when focusedCardIndex changes (but only after user interaction)
  useEffect(() => {
    if (shouldFocusCard && gridRef.current && focusedCardIndex >= 0) {
      const cards = gridRef.current.querySelectorAll('[data-phrase-card]');
      if (cards[focusedCardIndex]) {
        (cards[focusedCardIndex] as HTMLElement).focus();
      }
    }
  }, [focusedCardIndex, shouldFocusCard]);

  // Handle arrow key navigation in phrase grid
  const handleGridKeyDown = (
    event: React.KeyboardEvent,
    currentIndex: number
  ) => {
    // Press 'a' to jump to about section
    if (event.key === 'a' || event.key === 'A') {
      event.preventDefault();
      aboutSectionRef?.current?.focus();
      setAnnouncement('Jumped to about section');
      return;
    }

    // Check if focus is inside references - if so, don't handle arrow keys
    const target = event.target as HTMLElement;
    const isInsideReferences = target.closest(
      '[role="group"][aria-label*="references"]'
    );
    if (
      isInsideReferences &&
      (event.key.startsWith('Arrow') ||
        event.key === 'Home' ||
        event.key === 'End')
    ) {
      // Let the references component handle navigation
      return;
    }

    const totalCards = phrases.length;
    let newIndex = currentIndex;
    let handled = false;

    switch (event.key) {
      case 'Tab':
        // Allow Tab to navigate through card content naturally
        return;

      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex + 1;
        if (newIndex >= totalCards) {
          newIndex = totalCards - 1;
        }
        handled = true;
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = 0;
        }
        handled = true;
        break;

      default:
        return;
    }

    if (handled && newIndex !== currentIndex) {
      setShouldFocusCard(true);
      setFocusedCardIndex(newIndex);
      // Announce the new position to screen readers
      setAnnouncement(`Phrase ${newIndex + 1} of ${totalCards}`);
    }
  };

  const defaultAriaLabel = `Collection of ${phrases.length} Quranic phrases with translations`;

  return (
    <>
      <Box
        ref={gridRef}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 3, md: 4 },
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
        aria-label={ariaLabel || defaultAriaLabel}
      >
        {phrases.map((phrase, index) => (
          <Box
            key={`phrase-${idPrefix}-${index}`}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 12px)',
                md: '1 1 calc(33.333% - 16px)',
                lg: '1 1 calc(25% - 18px)',
                xl: '1 1 calc(20% - 19.2px)',
              },
              minWidth: { xs: '280px', sm: '320px' },
              maxWidth: '100%',
            }}
          >
            <Box
              data-phrase-card='true'
              tabIndex={0}
              onClick={() => onPhraseClick(phrase)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onPhraseClick(phrase);
                } else {
                  handleGridKeyDown(e, index);
                }
              }}
              aria-label={`Phrase ${index + 1} of ${phrases.length}. Arabic: ${
                phrase.arabicText
              }. English: ${phrase.englishText}. Hindi: ${
                phrase.hindiText || 'Translation not available'
              }. Urdu: ${phrase.urduText}. References: ${formatReferences(
                phrase.references
              ).join(', ')}. Press Enter to open details.`}
              sx={{
                cursor: 'pointer',
                width: '100%',
                '&:focus': {
                  outline: '3px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
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
                elevation={2}
                isInteractive={false}
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
                }}
                id={`${idPrefix}-${index + 1}`}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {announcement && (
        <ScreenReaderAnnouncement
          message={announcement}
          politeness='assertive'
        />
      )}

      <ScreenReaderAnnouncement
        message={`Displaying ${phrases.length} Quranic phrases with Arabic text and translations in English, Hindi, and Urdu. Each card includes relevant verse references and can be navigated using keyboard or screen reader.`}
      />
    </>
  );
}
