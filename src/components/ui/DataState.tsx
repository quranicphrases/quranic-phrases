import { Box, CircularProgress, Typography, Alert } from '@mui/material';

interface DataStateProps {
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

/**
 * Component that handles loading, error, and empty states for data display
 * Renders children when data is ready, otherwise shows appropriate state
 */
export default function DataState({
  loading = false,
  error = null,
  isEmpty = false,
  emptyMessage = 'No data available',
  children,
}: DataStateProps) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='error'>{error}</Alert>
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
        }}
      >
        <Typography variant='body1' color='text.secondary'>
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
