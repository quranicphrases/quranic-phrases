import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

export interface PhraseTextProps {
  /** The main text content to display */
  text: string;
  /** Text alignment - defaults to 'left' */
  textAlign?: 'left' | 'right' | 'center';
  /** Text direction - defaults to 'ltr' */
  direction?: 'ltr' | 'rtl';
  /** Font family override */
  fontFamily?: string;
  /** Language code for screen readers (e.g., 'ar', 'en', 'hi', 'ur') */
  languageCode?: string;
  /** Custom Material-UI sx props for styling */
  sx?: SxProps<Theme>;
  /** Typography variant for the main text */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  /** Use Paper component as wrapper */
  usePaper?: boolean;
  /** Display multi-line text with newlines preserved (true) or use inline separators (false) */
  multiLine?: boolean;
}

const PhraseText: React.FC<PhraseTextProps> = ({
  text,
  textAlign = 'left',
  direction = 'ltr',
  fontFamily,
  languageCode,
  sx = {},
  variant = 'body1',
  usePaper = false,
  multiLine = false,
}) => {
  // Determine Material-UI text alignment
  const muiTextAlign = textAlign as 'left' | 'right' | 'center';

  // Replace newlines with separator for inline display, or preserve for multi-line
  const separator = direction === 'rtl' ? ' ۝ ' : ' • ';
  const displayText = multiLine ? text : text.replace(/\n/g, separator);

  const content = (
    <Box
      role='article'
      aria-labelledby='phrase-content'
      sx={{
        direction,
        ...sx,
      }}
    >
      {/* Main Text Content */}
      <Box
        sx={{
          overflowX: multiLine ? 'visible' : 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '2px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
          },
          // For Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0,0,0,0.2) rgba(0,0,0,0.05)',
        }}
      >
        <Typography
          id='phrase-content'
          variant={variant}
          component='div'
          lang={languageCode}
          role='main'
          aria-live='polite'
          tabIndex={0}
          sx={{
            textAlign: muiTextAlign,
            direction,
            fontFamily: fontFamily || 'inherit',
            whiteSpace: multiLine ? 'pre-line' : 'nowrap',
            minWidth: multiLine ? 'auto' : 'fit-content',
            lineHeight:
              variant === 'h4' ? 2.2 : variant === 'body1' ? 1.8 : 'inherit',
            '&:focus': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px',
              borderRadius: 1,
            },
          }}
        >
          {displayText}
        </Typography>
      </Box>
    </Box>
  );

  return usePaper ? <Paper sx={{ p: 3, ...sx }}>{content}</Paper> : content;
};

export default PhraseText;
