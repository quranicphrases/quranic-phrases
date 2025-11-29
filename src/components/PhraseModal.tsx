import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PhraseCard, { type PhraseCardProps } from './PhraseCard';

export interface PhraseModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Props to pass to the PhraseCard component */
  phraseCardProps: PhraseCardProps;
}

const PhraseModal: React.FC<PhraseModalProps> = ({
  open,
  onClose,
  phraseCardProps,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  // MUI Dialog already handles body scroll locking
  // Removed manual body scroll management to prevent conflicts

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      fullScreen={isMobile}
      aria-labelledby='phrase-modal-title'
      aria-describedby='phrase-modal-description'
      aria-modal='true'
      role='dialog'
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
              onClick={onClose}
              aria-label='Close phrase details modal'
              size='large'
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
                '&:focus': {
                  outline: '2px solid',
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
            <Box
              id='phrase-modal-description'
              role='document'
              aria-live='polite'
            >
              <PhraseCard
                {...phraseCardProps}
                multiLine={true}
                elevation={0}
                sx={{
                  boxShadow: 'none',
                  border: 'none',
                  ...phraseCardProps.sx,
                }}
              />
            </Box>

            {/* Screen Reader Instructions */}
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
              Modal opened with full phrase details. Press Escape key or click
              the close button to dismiss this modal and return to the phrases
              list.
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default PhraseModal;
