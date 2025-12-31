import React from 'react';
import { Box, Typography } from '@mui/material';
import ReferenceBadge from './ReferenceBadge';

export interface ReferencesProps {
  /** Array of reference strings in format "surahNo:verseNo" */
  references: string[];
  /** Custom click handler for reference badges */
  onReferenceClick?: (reference: string) => void;
  /** Custom redirect URL for reference badges */
  redirectUrl?: string;
  /** Whether references are interactive (focusable and clickable) - true for modal, false for grid */
  isInteractive?: boolean;
}

const References: React.FC<ReferencesProps> = ({
  references,
  onReferenceClick,
  redirectUrl,
  isInteractive = true,
}) => {
  return (
    <Box
      {...(!isInteractive && { tabIndex: -1 })}
      sx={{ width: '100%' }}
      role='group'
      aria-label={`Quran references: ${references.join(', ')}`}
    >
      {/* Screen reader announcement */}
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
        {references.length} Quran{' '}
        {references.length === 1 ? 'reference' : 'references'}
      </Box>

      {/* Horizontally Scrollable Reference Badges */}
      <Box
        {...(!isInteractive && { tabIndex: -1 })}
        sx={{
          display: 'flex',
          gap: 0.5,
          overflowX: 'auto',
          overflowY: 'hidden',
          pb: 0.5,
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.4)',
            },
          },
          // For Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0,0,0,0.3) rgba(0,0,0,0.1)',
        }}
      >
        {references.map((reference, index) => (
          <Box
            key={`${reference}-${index}`}
            {...(!isInteractive && { tabIndex: -1 })}
            sx={{
              flexShrink: 0, // Prevent badges from shrinking
            }}
          >
            <ReferenceBadge
              reference={reference}
              onClick={
                onReferenceClick ? () => onReferenceClick(reference) : undefined
              }
              redirectUrl={redirectUrl}
              isInteractive={isInteractive}
            />
          </Box>
        ))}
      </Box>

      {/* Empty State */}
      {references.length === 0 && (
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
          }}
        >
          No references available
        </Typography>
      )}
    </Box>
  );
};

export default References;
