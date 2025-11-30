import React, { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { PhraseCardProps } from './PhraseCard';
import ReferenceBadge from './ReferenceBadge';

export interface PhraseModalEnhancedProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Props to pass to the PhraseCard component */
  phraseCardProps: PhraseCardProps;
}

type FocusSection =
  | 'close'
  | 'arabic'
  | 'english'
  | 'hindi'
  | 'urdu'
  | 'references';

const PhraseModalEnhanced: React.FC<PhraseModalEnhancedProps> = ({
  open,
  onClose,
  phraseCardProps,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Refs for focusable elements
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const arabicRef = useRef<HTMLDivElement>(null);
  const englishRef = useRef<HTMLDivElement>(null);
  const hindiRef = useRef<HTMLDivElement>(null);
  const urduRef = useRef<HTMLDivElement>(null);
  const referencesContainerRef = useRef<HTMLDivElement>(null);

  // State for current focus section and reference index
  const [focusSection, setFocusSection] = useState<FocusSection>('close');
  const [focusedReferenceIndex, setFocusedReferenceIndex] = useState<number>(0);

  const { arabic, english, hindi, urdu, references, onReferenceClick } =
    phraseCardProps;

  // Reset focus when modal opens
  useEffect(() => {
    if (open) {
      setFocusSection('close');
      setFocusedReferenceIndex(0);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose();
        break;

      case 'ArrowDown':
        event.preventDefault();
        navigateDown();
        break;

      case 'ArrowUp':
        event.preventDefault();
        navigateUp();
        break;

      case 'ArrowLeft':
        if (focusSection === 'references') {
          event.preventDefault();
          navigateReferencesLeft();
        }
        break;

      case 'ArrowRight':
        if (focusSection === 'references') {
          event.preventDefault();
          navigateReferencesRight();
        }
        break;

      case 'Enter':
      case ' ':
        if (focusSection === 'references' && onReferenceClick) {
          event.preventDefault();
          const ref = references[focusedReferenceIndex];
          if (ref) {
            onReferenceClick(ref);
          }
        }
        break;
    }
  };

  const navigateDown = () => {
    const sections: FocusSection[] = [
      'close',
      'arabic',
      'english',
      'hindi',
      'urdu',
    ];
    if (references.length > 0) {
      sections.push('references');
    }

    const currentIndex = sections.indexOf(focusSection);
    const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
    const nextSection = sections[nextIndex];

    setFocusSection(nextSection);
    focusElement(nextSection);
  };

  const navigateUp = () => {
    const sections: FocusSection[] = [
      'close',
      'arabic',
      'english',
      'hindi',
      'urdu',
    ];
    if (references.length > 0) {
      sections.push('references');
    }

    const currentIndex = sections.indexOf(focusSection);
    const prevIndex = Math.max(currentIndex - 1, 0);
    const prevSection = sections[prevIndex];

    setFocusSection(prevSection);
    focusElement(prevSection);
  };

  const navigateReferencesLeft = () => {
    const newIndex = Math.max(focusedReferenceIndex - 1, 0);
    setFocusedReferenceIndex(newIndex);
    focusReference(newIndex);
  };

  const navigateReferencesRight = () => {
    const newIndex = Math.min(focusedReferenceIndex + 1, references.length - 1);
    setFocusedReferenceIndex(newIndex);
    focusReference(newIndex);
  };

  const focusElement = (section: FocusSection) => {
    switch (section) {
      case 'close':
        closeButtonRef.current?.focus();
        break;
      case 'arabic':
        arabicRef.current?.focus();
        break;
      case 'english':
        englishRef.current?.focus();
        break;
      case 'hindi':
        hindiRef.current?.focus();
        break;
      case 'urdu':
        urduRef.current?.focus();
        break;
      case 'references':
        setFocusedReferenceIndex(0);
        focusReference(0);
        break;
    }
  };

  const focusReference = (index: number) => {
    if (referencesContainerRef.current) {
      const badges =
        referencesContainerRef.current.querySelectorAll('[role="button"]');
      if (badges[index]) {
        (badges[index] as HTMLElement).focus();
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      fullScreen={isMobile}
      aria-labelledby='phrase-modal-title'
      aria-describedby='phrase-modal-instructions'
      aria-modal='true'
      role='dialog'
      onKeyDown={handleKeyDown}
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: isMobile ? '100vh' : '90vh',
          m: isMobile ? 0 : 2,
          borderRadius: isMobile ? 0 : 2,
        },
      }}
    >
      {/* Only render content when modal is open */}
      {open && (
        <>
          {/* Close Button */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              p: 1,
              backgroundColor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <IconButton
              ref={closeButtonRef}
              onClick={onClose}
              aria-label='Close modal'
              size='large'
              tabIndex={0}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
                '&:focus': {
                  outline: '3px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              <CloseIcon fontSize='large' />
            </IconButton>
          </Box>

          {/* Modal Content */}
          <DialogContent
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                },
              },
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0,0,0,0.2) rgba(0,0,0,0.05)',
            }}
          >
            <Box id='phrase-modal-description'>
              {/* Arabic Text */}
              <Box
                sx={{
                  mb: 3,
                }}
              >
                <Typography
                  ref={arabicRef}
                  tabIndex={0}
                  variant='h4'
                  component='p'
                  lang='ar'
                  dir='rtl'
                  sx={{
                    textAlign: 'right',
                    color: 'primary.main',
                    fontWeight: 500,
                    lineHeight: 2.2,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontFamily: "'Amiri', 'Times New Roman', serif",
                    whiteSpace: 'pre-line',
                    '&:focus': {
                      outline: '3px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                      borderRadius: 1,
                    },
                  }}
                >
                  <Box
                    component='span'
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
                  >
                    Arabic text:{' '}
                  </Box>
                  {arabic.text}
                </Typography>
              </Box>

              {/* English Translation */}
              <Box
                sx={{
                  mb: 3,
                }}
              >
                <Typography
                  ref={englishRef}
                  tabIndex={0}
                  variant='body1'
                  component='p'
                  lang='en'
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line',
                    '&:focus': {
                      outline: '3px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                      borderRadius: 1,
                    },
                  }}
                >
                  <Box
                    component='span'
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
                  >
                    English translation:{' '}
                  </Box>
                  {english.text}
                </Typography>
              </Box>

              {/* Hindi Translation */}
              <Box
                sx={{
                  mb: 3,
                }}
              >
                <Typography
                  ref={hindiRef}
                  tabIndex={0}
                  variant='body1'
                  component='p'
                  lang='hi'
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.8,
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    whiteSpace: 'pre-line',
                    '&:focus': {
                      outline: '3px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                      borderRadius: 1,
                    },
                  }}
                >
                  <Box
                    component='span'
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
                  >
                    Hindi translation:{' '}
                  </Box>
                  {hindi.text}
                </Typography>
              </Box>

              {/* Urdu Translation */}
              <Box
                sx={{
                  mb: 3,
                }}
              >
                <Typography
                  ref={urduRef}
                  tabIndex={0}
                  variant='body1'
                  component='p'
                  lang='ur'
                  dir='rtl'
                  sx={{
                    textAlign: 'right',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 2,
                    fontFamily:
                      "'Noto Nastaliq Urdu', 'Times New Roman', serif",
                    whiteSpace: 'pre-line',
                    '&:focus': {
                      outline: '3px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                      borderRadius: 1,
                    },
                  }}
                >
                  <Box
                    component='span'
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
                  >
                    Urdu translation:{' '}
                  </Box>
                  {urdu.text}
                </Typography>
              </Box>

              {/* References Section */}
              {references.length > 0 && (
                <Box
                  ref={referencesContainerRef}
                  role='group'
                  aria-label={`Quran references: ${references.join(
                    ', '
                  )}. Use left and right arrow keys to navigate.`}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    mt: 3,
                  }}
                >
                  {references.map((reference, index) => (
                    <ReferenceBadge
                      key={`${reference}-${index}`}
                      reference={reference}
                      onClick={
                        onReferenceClick
                          ? () => onReferenceClick(reference)
                          : undefined
                      }
                      chipProps={{
                        tabIndex: index === focusedReferenceIndex ? 0 : -1,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* Screen Reader Instructions */}
            <Box
              id='phrase-modal-instructions'
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
            >
              Phrase details modal. Press up and down arrow keys to navigate
              between Arabic text, English, Hindi, and Urdu translations. When
              in references section, press left and right arrow keys to navigate
              between verse references. Press Escape to close the modal.
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default PhraseModalEnhanced;
