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
  /** Whether badge is interactive (focusable and clickable) - true for modal, false for grid */
  isInteractive?: boolean;
}

const ReferenceBadge: React.FC<ReferenceBadgeProps> = ({
  reference,
  onClick,
  chipProps = {},
  redirectUrl,
  isInteractive = true,
}) => {
  const tabIndex = isInteractive ? 0 : -1;
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

  // Convert reference to screen reader friendly format
  // \"10:20\" becomes \"Reference Ten Twenty\"
  const getScreenReaderLabel = (ref: string) => {
    const [surah, verse] = ref.split(':');
    const words = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ];
    const surahWords = surah
      .split('')
      .map(digit => words[parseInt(digit)])
      .join(' ');
    const verseWords = verse
      .split('')
      .map(digit => words[parseInt(digit)])
      .join(' ');
    return `Reference ${surahWords} colon ${verseWords}`;
  };

  return (
    <Chip
      label={reference}
      {...(isInteractive && {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      })}
      clickable={isInteractive}
      color='primary'
      variant='filled'
      size='small'
      icon={<LinkIcon />}
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        fontWeight: 'medium',
        fontSize: '0.875rem',
        ...(isInteractive && {
          '&:hover': {
            backgroundColor: '#1565c0',
          },
          '&:focus': {
            backgroundColor: '#1565c0',
            outline: '2px solid #90caf9',
            outlineOffset: '2px',
          },
          cursor: 'pointer',
        }),
        ...chipProps?.sx,
      }}
      aria-label={getScreenReaderLabel(reference)}
      {...(isInteractive && { role: 'button' })}
      tabIndex={tabIndex}
      {...chipProps}
    />
  );
};

export default ReferenceBadge;
