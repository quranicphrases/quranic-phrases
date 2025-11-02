import React from 'react';
import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

export interface ReferenceBadgeProps {
  /** Reference in format "surahNo:verseNo" (e.g., "2:255") */
  reference: string;
  /** Custom click handler - if not provided, redirects to google.com */
  onClick?: () => void;
  /** Additional Material-UI Chip props */
  chipProps?: Omit<ChipProps, 'label' | 'onClick' | 'clickable'>;
  /** Custom URL to redirect to instead of google.com */
  redirectUrl?: string;
}

const ReferenceBadge: React.FC<ReferenceBadgeProps> = ({
  reference,
  onClick,
  chipProps = {},
  redirectUrl = 'https://google.com',
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Chip
      label={reference}
      onClick={handleClick}
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
