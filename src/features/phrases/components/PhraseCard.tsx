import React from 'react';
import { Card, CardContent, Box, Divider } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import PhraseText from '../../../components/ui/PhraseText';
import References from '../../../features/references/components/References';

export interface PhraseCardProps {
  /** Arabic text content */
  arabic: {
    text: string;
    edition: string;
  };
  /** English text content */
  english: {
    text: string;
    edition: string;
  };
  /** Hindi text content */
  hindi: {
    text: string;
    edition: string;
  };
  /** Urdu text content */
  urdu: {
    text: string;
    edition: string;
  };
  /** Array of reference strings */
  references: string[];
  /** Custom click handler for reference badges */
  onReferenceClick?: (reference: string) => void;
  /** Custom redirect URL for reference badges */
  redirectUrl?: string;
  /** Custom Material-UI sx props for styling the card */
  sx?: SxProps<Theme>;
  /** Card elevation (0-24) */
  elevation?: number;
  /** Custom ID for the card for accessibility */
  id?: string;
  /** Display multi-line text with newlines preserved (true) or use inline separators (false) */
  multiLine?: boolean;
  /** Whether content is interactive (focusable and clickable) - true for modal, false for grid */
  isInteractive?: boolean;
}

const PhraseCard: React.FC<PhraseCardProps> = ({
  arabic,
  english,
  hindi,
  urdu,
  references,
  onReferenceClick,
  redirectUrl,
  sx = {},
  elevation = 2,
  id,
  multiLine = false,
  isInteractive = true,
}) => {
  // Generate unique IDs for accessibility
  const cardId = id || `phrase-card-${Date.now()}`;
  const arabicId = `${cardId}-arabic`;
  const englishId = `${cardId}-english`;
  const hindiId = `${cardId}-hindi`;
  const urduId = `${cardId}-urdu`;
  const referencesId = `${cardId}-references`;

  return (
    <Card
      elevation={elevation}
      id={cardId}
      {...(!isInteractive && { tabIndex: -1 })}
      role='article'
      aria-labelledby={arabicId}
      aria-describedby={`${englishId} ${hindiId} ${urduId} ${referencesId}`}
      sx={{
        maxWidth: '100%',
        '&:focus-within': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
        ...sx,
      }}
    >
      <CardContent
        {...(!isInteractive && { tabIndex: -1 })}
        sx={{
          p: 1.5,
          '&:last-child': {
            pb: 1.5,
          },
        }}
      >
        {/* Arabic Text - Primary content */}
        <Box
          id={arabicId}
          {...(isInteractive && { tabIndex: 0 })}
          {...(!isInteractive && { tabIndex: -1 })}
          sx={{
            mb: 1.5,
            ...(isInteractive && {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
                borderRadius: '4px',
              },
            }),
          }}
          role='text'
          aria-label={`Arabic Phrase: ${arabic.text}`}
        >
          <PhraseText
            text={arabic.text}
            textAlign='right'
            direction='rtl'
            variant='h4'
            languageCode='ar'
            fontFamily="'Amiri', 'Times New Roman', serif"
            multiLine={multiLine}
            isInteractive={isInteractive}
            sx={{
              '& #phrase-content': {
                id: arabicId,
                color: 'primary.main',
                fontWeight: 500,
                lineHeight: 2.2,
                fontSize: { xs: '1.5rem', md: '2rem' },
              },
            }}
          />
        </Box>

        <Divider sx={{ my: 1 }} aria-hidden='true' />

        {/* English Translation */}
        <Box
          id={englishId}
          {...(isInteractive && { tabIndex: 0 })}
          {...(!isInteractive && { tabIndex: -1 })}
          sx={{
            mb: 1.5,
            ...(isInteractive && {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
                borderRadius: '4px',
              },
            }),
          }}
          role='text'
          aria-label={`English Translation: ${english.text}`}
        >
          <PhraseText
            text={english.text}
            textAlign='left'
            direction='ltr'
            variant='body1'
            languageCode='en'
            multiLine={multiLine}
            isInteractive={isInteractive}
            sx={{
              '& #phrase-content': {
                id: englishId,
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
              },
            }}
          />
        </Box>

        <Divider sx={{ my: 1 }} aria-hidden='true' />

        {/* Hindi Translation */}
        <Box
          id={hindiId}
          {...(isInteractive && { tabIndex: 0 })}
          {...(!isInteractive && { tabIndex: -1 })}
          sx={{
            mb: 1.5,
            ...(isInteractive && {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
                borderRadius: '4px',
              },
            }),
          }}
          role='text'
          aria-label={`Hindi Translation: ${hindi.text}`}
        >
          <PhraseText
            text={hindi.text}
            textAlign='left'
            direction='ltr'
            variant='body1'
            languageCode='hi'
            fontFamily="'Noto Sans Devanagari', sans-serif"
            multiLine={multiLine}
            isInteractive={isInteractive}
            sx={{
              '& #phrase-content': {
                id: hindiId,
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
              },
            }}
          />
        </Box>

        <Divider sx={{ my: 1 }} aria-hidden='true' />

        {/* Urdu Translation */}
        <Box
          id={urduId}
          {...(isInteractive && { tabIndex: 0 })}
          {...(!isInteractive && { tabIndex: -1 })}
          sx={{
            mb: 1.5,
            ...(isInteractive && {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
                borderRadius: '4px',
              },
            }),
          }}
          role='text'
          aria-label={`Urdu Translation: ${urdu.text}`}
        >
          <PhraseText
            text={urdu.text}
            textAlign='right'
            direction='rtl'
            variant='body1'
            languageCode='ur'
            fontFamily="'Noto Nastaliq Urdu', 'Times New Roman', serif"
            multiLine={multiLine}
            isInteractive={isInteractive}
            sx={{
              '& #phrase-content': {
                id: urduId,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 2,
              },
            }}
          />
        </Box>

        {/* References Section */}
        {references.length > 0 && (
          <>
            <Divider sx={{ my: 1.5 }} aria-hidden='true' />
            <Box id={referencesId} {...(!isInteractive && { tabIndex: -1 })}>
              <References
                references={references}
                onReferenceClick={onReferenceClick}
                redirectUrl={redirectUrl}
                isInteractive={isInteractive}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PhraseCard;
