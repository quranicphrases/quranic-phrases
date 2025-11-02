import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { aboutPraisesText } from '../assets/aboutPraisesText';

const PraisesPage: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        py: 3,
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: { xs: '100%', xl: '95%' },
        width: '100%',
      }}
    >
      {/* Page Title */}
      <Typography
        variant='h3'
        component='h1'
        align='center'
        gutterBottom
        sx={{
          mb: 4,
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        Praises from the Quran
      </Typography>

      {/* About Section */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
          mb: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          width: '100%',
          maxWidth: '100%',
          mx: { xs: 0, xl: 'auto' },
        }}
      >
        <Typography
          variant='h5'
          component='h2'
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 'medium',
            mb: 3,
          }}
        >
          About Quranic Praises
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant='body1'
          sx={{
            lineHeight: 1.8,
            color: 'text.primary',
            textAlign: 'justify',
            whiteSpace: 'pre-line',
          }}
        >
          {aboutPraisesText}
        </Typography>
      </Paper>

      {/* Placeholder for future praise phrases content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: 'grey.50',
            border: '2px dashed',
            borderColor: 'grey.300',
          }}
        >
          <Typography variant='h6' color='text.secondary' gutterBottom>
            Praise Phrases Coming Soon
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            This section will contain beautiful Quranic phrases of praise in
            Arabic, English, Hindi, and Urdu.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default PraisesPage;
