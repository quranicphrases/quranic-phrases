import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

export interface PageLink {
  path: string;
  label: string;
  ariaLabel?: string;
}

export interface ListOfPagesProps {
  /** Array of page links to display */
  pages: PageLink[];
  /** Optional custom styling */
  sx?: any;
}

const ListOfPages: React.FC<ListOfPagesProps> = ({ pages, sx = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = React.useState<number>(() => {
    // Initialize with current page index
    const currentIndex = pages.findIndex(
      page => page.path === location.pathname
    );
    return currentIndex >= 0 ? currentIndex : 0;
  });

  // Update focused index when location changes
  React.useEffect(() => {
    const currentIndex = pages.findIndex(
      page => page.path === location.pathname
    );
    if (currentIndex >= 0) {
      setFocusedIndex(currentIndex);
    }
  }, [location.pathname, pages]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (index + 1) % pages.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (index - 1 + pages.length) % pages.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = pages.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        navigate(pages[index].path);
        // Keep focus on the selected menu item
        return;
      default:
        return;
    }

    // Update focused index and focus the new link
    if (newIndex !== index) {
      setFocusedIndex(newIndex);
      if (navRef.current) {
        const links = navRef.current.querySelectorAll('a');
        if (links[newIndex]) {
          (links[newIndex] as HTMLElement).focus();
        }
      }
    }
  };

  return (
    <Box
      component='nav'
      role='navigation'
      aria-label='Main navigation'
      ref={navRef}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 3,
        ...sx,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          borderRadius: 0,
          backgroundColor: 'white',
          color: '#1976d2', // Blue text color
        }}
      >
        <Box
          role='menubar'
          aria-label='Page navigation menu'
          sx={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            px: { xs: 2, sm: 3, md: 4 },
            py: 2,
            gap: { xs: 2, sm: 3, md: 4 },
            minHeight: '64px',
            alignItems: 'center',
            // Custom scrollbar styling for better UX
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(25, 118, 210, 0.4)', // Blue scrollbar
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.6)',
              },
            },
            // Firefox scrollbar
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(25, 118, 210, 0.4) rgba(0, 0, 0, 0.1)',
          }}
        >
          {pages.map((page, index) => {
            const isActive = location.pathname === page.path;

            return (
              <Box
                key={page.path}
                role='none'
                sx={{
                  flexShrink: 0,
                  minWidth: 'fit-content',
                }}
              >
                <Typography
                  component={Link}
                  to={page.path}
                  variant='h6'
                  role='menuitem'
                  onKeyDown={e => handleKeyDown(e, index)}
                  onClick={e => {
                    e.preventDefault();
                    navigate(page.path);
                  }}
                  sx={{
                    textDecoration: 'none',
                    color: '#1976d2', // Blue text color for all links
                    fontWeight: isActive ? 'bold' : 'medium',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent', // No background color
                    border: isActive
                      ? '2px solid #1976d2' // Blue border for active
                      : '2px solid transparent',
                    display: 'inline-block',
                    transition: 'all 0.2s ease-in-out',
                    whiteSpace: 'nowrap',
                    position: 'relative',

                    // Hover effects
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)', // Light blue background on hover
                      transform: 'translateY(-1px)',
                      color: '#1565c0', // Darker blue on hover
                    },

                    // Focus styles for accessibility
                    '&:focus': {
                      outline: 'none',
                      border: '2px solid #1976d2', // Blue border for focus
                      backgroundColor: 'rgba(25, 118, 210, 0.08)', // Light blue background on focus
                    },

                    // Active link indicator
                    '&::after': isActive
                      ? {
                          content: '""',
                          position: 'absolute',
                          bottom: '-10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#1976d2', // Blue indicator dot
                          borderRadius: '50%',
                        }
                      : {},
                  }}
                  aria-label={page.ariaLabel || `Navigate to ${page.label}`}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={index === focusedIndex ? 0 : -1}
                >
                  {page.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Screen Reader Navigation Info */}
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
        aria-atomic='true'
      >
        Navigation menu with {pages.length} pages. Use left and right arrow keys
        to navigate between pages, or press Tab. Press Enter or Space to
        activate. Current page:{' '}
        {pages.find(page => location.pathname === page.path)?.label ||
          'Unknown'}
      </Box>
    </Box>
  );
};

export default ListOfPages;
