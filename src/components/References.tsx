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
}

const References: React.FC<ReferencesProps> = ({
  references,
  onReferenceClick,
  redirectUrl,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Horizontally Scrollable Reference Badges */}
      <Box
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
