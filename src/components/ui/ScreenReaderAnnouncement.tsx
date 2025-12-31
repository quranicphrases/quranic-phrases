import { Box } from '@mui/material';

interface ScreenReaderAnnouncementProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

/**
 * Hidden component that announces messages to screen readers
 * Used for dynamic content updates that need to be communicated to assistive technology
 */
export default function ScreenReaderAnnouncement({
  message,
  politeness = 'polite',
}: ScreenReaderAnnouncementProps) {
  return (
    <Box
      component='div'
      aria-live={politeness}
      aria-atomic='true'
      sx={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {message}
    </Box>
  );
}
