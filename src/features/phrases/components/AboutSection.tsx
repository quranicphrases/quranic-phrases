import { forwardRef } from 'react';
import { Paper, Typography, Divider } from '@mui/material';

interface AboutSectionProps {
  id: string;
  title: string;
  text: string;
}

/**
 * About section component that displays information about the current page
 * Provides context and explanation for the phrases collection
 */
const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ id, title, text }, ref) => {
    return (
      <Paper
        ref={ref}
        id={id}
        tabIndex={0}
        elevation={3}
        aria-label={`${title}. ${text}`}
        sx={{
          p: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
          mb: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          width: '100%',
          maxWidth: '100%',
          mx: { xs: 0, xl: 'auto' },
          '&:focus': {
            outline: '3px solid',
            outlineColor: 'primary.main',
            outlineOffset: '2px',
          },
        }}
      >
        <Typography
          id={`${id}-title`}
          variant='h5'
          component='h2'
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 'medium',
            mb: 3,
          }}
        >
          {title}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant='body1'
          component='div'
          lang='en'
          sx={{
            lineHeight: 1.8,
            color: 'text.primary',
            textAlign: 'justify',
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </Typography>
      </Paper>
    );
  }
);

AboutSection.displayName = 'AboutSection';

export default AboutSection;
