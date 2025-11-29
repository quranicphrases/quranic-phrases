import React from 'react';
import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import { getQuranVerseUrl } from '../utils/quranReference';

export interface ReferenceBadgeProps {
  /** Reference in format "surahNo:verseNo" (e.g., "2:255") */
  reference: string;
  /** Custom click handler - if not provided, navigates to AlQuran.cloud */
  onClick?: () => void;
  /** Additional Material-UI Chip props */
  chipProps?: Omit<ChipProps, 'label' | 'onClick' | 'clickable'>;
  /** Custom URL to redirect to instead of AlQuran.cloud */
  redirectUrl?: string;
}

const ReferenceBadge: React.FC<ReferenceBadgeProps> = ({
  reference,
  onClick,
  chipProps = {},
  redirectUrl,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    // Stop event from bubbling up to parent card
    event.stopPropagation();

    if (onClick) {
      onClick();
    } else {
      // Use custom redirect URL or generate AlQuran.cloud URL from reference
      const url =
        redirectUrl ||
        (() => {
          const [surahStr, verseStr] = reference.split(':');
          const surahNo = parseInt(surahStr, 10);
          const verseNo = parseInt(verseStr, 10);
          return getQuranVerseUrl(surahNo, verseNo);
        })();

      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Activate on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      handleClick(event as any);
    }
  };

  return (
    <Chip
      label={reference}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      clickable
      color='primary'
      variant='filled'
      size='small'
      icon={<LinkIcon />}
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        fontWeight: 'medium',
        fontSize: '0.875rem',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
        '&:focus': {
          backgroundColor: '#1565c0',
          outline: '2px solid #90caf9',
          outlineOffset: '2px',
        },
        cursor: 'pointer',
        ...chipProps?.sx,
      }}
      aria-label={`Reference ${reference} - Click to view`}
      role='button'
      tabIndex={0}
      {...chipProps}
    />
  );
};

export default ReferenceBadge;
