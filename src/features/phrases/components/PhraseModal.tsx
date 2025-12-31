import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PhraseCard from './PhraseCard';
import type { PhraseCardProps } from './PhraseCard';

export interface PhraseModalProps {
  open: boolean;
  onClose: () => void;
  phraseCardProps: PhraseCardProps;
}

/**
 * Modal dialog that displays a phrase in full detail
 * Reuses PhraseCard component for consistent rendering
 * Provides enhanced keyboard navigation: Escape to close, Ctrl+Home to return to close button
 */
export default function PhraseModal({
  open,
  onClose,
  phraseCardProps,
}: PhraseModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  // Focus close button when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Escape to close
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    // Ctrl+Home to return to close button
    if (event.ctrlKey && event.key === 'Home') {
      event.preventDefault();
      closeButtonRef.current?.focus();
      return;
    }

    // Arrow key navigation between reference badges
    if (dialogContentRef.current && phraseCardProps.references) {
      const referenceBadges = dialogContentRef.current.querySelectorAll(
        '[role="button"][aria-label*="Reference"]'
      );

      if (referenceBadges.length > 0) {
        const currentFocus = document.activeElement;
        const currentIndex = Array.from(referenceBadges).findIndex(
          badge => badge === currentFocus
        );

        let newIndex = currentIndex;

        if (event.key === 'ArrowRight' && currentIndex >= 0) {
          event.preventDefault();
          newIndex = Math.min(currentIndex + 1, referenceBadges.length - 1);
        } else if (event.key === 'ArrowLeft' && currentIndex >= 0) {
          event.preventDefault();
          newIndex = Math.max(currentIndex - 1, 0);
        } else if (event.key === 'Home' && currentIndex >= 0) {
          event.preventDefault();
          newIndex = 0;
        } else if (event.key === 'End' && currentIndex >= 0) {
          event.preventDefault();
          newIndex = referenceBadges.length - 1;
        }

        if (newIndex !== currentIndex && newIndex >= 0) {
          (referenceBadges[newIndex] as HTMLElement).focus();
        }
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
      onKeyDown={handleKeyDown}
      aria-labelledby='phrase-modal-title'
      aria-describedby='phrase-modal-description'
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: '90vh',
        },
      }}
    >
      {/* Close Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
        }}
      >
        <IconButton
          ref={closeButtonRef}
          onClick={onClose}
          aria-label='Close modal'
          sx={{
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Modal Content - Reuse PhraseCard */}
      <DialogContent
        ref={dialogContentRef}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 6, sm: 6, md: 4 },
        }}
      >
        <PhraseCard
          {...phraseCardProps}
          elevation={0}
          multiLine={true}
          isInteractive={true}
          sx={{
            height: 'auto',
            boxShadow: 'none',
          }}
        />

        {/* Screen reader instructions */}
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
          Use arrow keys to navigate between reference badges. Press Ctrl+Home
          to return to close button. Press Escape to close modal.
        </Box>
      </DialogContent>
    </Dialog>
  );
}
