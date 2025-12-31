import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  Keyboard as KeyboardIcon,
} from '@mui/icons-material';

interface KeyboardGuideProps {
  /** Show guide on first visit */
  showOnMount?: boolean;
}

const KeyboardGuide: React.FC<KeyboardGuideProps> = ({
  showOnMount = false,
}) => {
  const [open, setOpen] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  useEffect(() => {
    // Check if user has seen the guide before
    const seen = localStorage.getItem('keyboard-guide-seen');
    if (!seen && showOnMount) {
      setOpen(true);
    }
    setHasSeenGuide(!!seen);
  }, [showOnMount]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('keyboard-guide-seen', 'true');
    setHasSeenGuide(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Listen for Shift+? to open guide
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === '?') {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {/* Floating keyboard icon button */}
      <IconButton
        onClick={handleOpen}
        aria-label='Show keyboard navigation guide - Press Shift+? for shortcuts'
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          zIndex: 1000,
          boxShadow: 3,
        }}
        size='large'
      >
        <KeyboardIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
        fullWidth
        aria-labelledby='keyboard-guide-title'
      >
        <DialogTitle id='keyboard-guide-title'>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h5' component='span'>
              Keyboard Navigation Guide
            </Typography>
            <IconButton
              onClick={handleClose}
              aria-label='Close keyboard guide'
              size='small'
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {!hasSeenGuide && (
            <Alert severity='info' sx={{ mb: 3 }}>
              Welcome! This guide will help you navigate the entire app using
              only your keyboard. Press <strong>Shift + ?</strong> anytime to
              reopen this guide.
            </Alert>
          )}

          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Global Navigation
          </Typography>
          <Table size='small' sx={{ mb: 3 }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Tab</strong>
                </TableCell>
                <TableCell>Move to next interactive element</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Shift + Tab</strong>
                </TableCell>
                <TableCell>Move to previous interactive element</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Shift + ?</strong>
                </TableCell>
                <TableCell>Open this keyboard guide</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Escape</strong>
                </TableCell>
                <TableCell>Close modals and dialogs</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6' gutterBottom>
            Page Navigation
          </Typography>
          <Table size='small' sx={{ mb: 3 }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Tab / Shift+Tab</strong>
                </TableCell>
                <TableCell>
                  Move between navigation menu and page content
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Arrow Left / Right</strong>
                </TableCell>
                <TableCell>
                  Navigate between page links in the menu (Overview, Anonymous,
                  Praises, etc.)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Home / End</strong>
                </TableCell>
                <TableCell>Jump to first/last page link in menu</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Enter / Space</strong>
                </TableCell>
                <TableCell>
                  Navigate to selected page (focus moves to About section)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6' gutterBottom>
            Phrase Cards Grid
          </Typography>
          <Table size='small' sx={{ mb: 3 }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Tab</strong>
                </TableCell>
                <TableCell>
                  Enter the phrase cards grid (focuses first card)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Arrow Keys</strong>
                </TableCell>
                <TableCell>
                  Navigate between cards (↑↓ for rows, ←→ for columns)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Home / End</strong>
                </TableCell>
                <TableCell>Jump to first/last phrase card</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Enter / Space</strong>
                </TableCell>
                <TableCell>
                  Open focused phrase card in modal for full view
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Single Tab Stop</strong>
                </TableCell>
                <TableCell>
                  Each card is one focusable element (no need to tab through
                  text/references)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6' gutterBottom>
            Reference Badges (in Modal)
          </Typography>
          <Table size='small' sx={{ mb: 3 }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Tab</strong>
                </TableCell>
                <TableCell>
                  Navigate through reference badges when viewing phrase in modal
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Enter / Space</strong>
                </TableCell>
                <TableCell>
                  Open reference on Quran.com with translations (new tab)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6' gutterBottom>
            Phrase Modal (Full View)
          </Typography>
          <Table size='small' sx={{ mb: 3 }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Escape</strong>
                </TableCell>
                <TableCell>Close the modal and return to phrase list</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Tab</strong>
                </TableCell>
                <TableCell>
                  Navigate through: Close button → Phrase text → References
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Arrow Up/Down</strong>
                </TableCell>
                <TableCell>Scroll through multi-line phrases</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6' gutterBottom color='primary'>
            Screen Reader Tips
          </Typography>
          <Box component='ul' sx={{ pl: 2 }}>
            <li>
              <Typography variant='body2'>
                <strong>Page Navigation:</strong> After selecting a page, focus
                automatically moves to the About section
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                <strong>Phrase Cards:</strong> Each card is a single focusable
                element with proper language tags (Arabic, English, Hindi, Urdu)
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                <strong>References:</strong> Announced as a group (e.g., "3
                Quran references") before individual verse numbers
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                <strong>Arrow Keys:</strong> Navigate between cards in grid and
                page links in menu
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                Use your screen reader's navigation mode to jump between
                headings and regions
              </Typography>
            </li>
          </Box>

          <Alert severity='success' sx={{ mt: 3 }}>
            <strong>Pro Tip:</strong> Arrow keys provide efficient navigation!
            Use ←→ in the menu, and ←→↑↓ to move between phrase cards in the
            grid.
          </Alert>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KeyboardGuide;
