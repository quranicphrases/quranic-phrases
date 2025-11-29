import React from 'react';
import { Card, CardContent, Box, Divider } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import PhraseText from './PhraseText';
import References from './References';

export interface PhraseCardProps {
  /** Arabic text content */
  arabic: {
    text: string;
    edition: string;
    editionEnglish?: string;
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
    editionEnglish?: string;
  };
  /** Urdu text content */
  urdu: {
    text: string;
    edition: string;
    editionEnglish?: string;
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
        sx={{
          p: 1.5,
          '&:last-child': {
            pb: 1.5,
          },
        }}
      >
        {/* Arabic Text - Primary content */}
        <Box sx={{ mb: 1.5 }}>
          <PhraseText
            language='العربية'
            languageEnglish='Arabic'
            edition={arabic.edition}
            editionEnglish={arabic.editionEnglish}
            text={arabic.text}
            textAlign='right'
            direction='rtl'
            variant='h4'
            languageCode='ar'
            fontFamily="'Amiri', 'Times New Roman', serif"
            multiLine={multiLine}
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
        <Box sx={{ mb: 1.5 }}>
          <PhraseText
            language='English'
            edition={english.edition}
            text={english.text}
            textAlign='left'
            direction='ltr'
            variant='body1'
            languageCode='en'
            multiLine={multiLine}
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
        <Box sx={{ mb: 1.5 }}>
          <PhraseText
            language='हिन्दी'
            languageEnglish='Hindi'
            edition={hindi.edition}
            editionEnglish={hindi.editionEnglish}
            text={hindi.text}
            textAlign='left'
            direction='ltr'
            variant='body1'
            languageCode='hi'
            fontFamily="'Noto Sans Devanagari', sans-serif"
            multiLine={multiLine}
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
        <Box sx={{ mb: 1.5 }}>
          <PhraseText
            language='اردو'
            languageEnglish='Urdu'
            edition={urdu.edition}
            editionEnglish={urdu.editionEnglish}
            text={urdu.text}
            textAlign='right'
            direction='rtl'
            variant='body1'
            languageCode='ur'
            fontFamily="'Noto Nastaliq Urdu', 'Times New Roman', serif"
            multiLine={multiLine}
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
            <Box id={referencesId}>
              <References
                references={references}
                onReferenceClick={onReferenceClick}
                redirectUrl={redirectUrl}
              />
            </Box>
          </>
        )}

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
          Quranic phrase card containing Arabic text:{' '}
          {arabic.text.substring(0, 50)}..., with translations in English,
          Hindi, and Urdu,
          {references.length > 0 && `and ${references.length} references`}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PhraseCard;
