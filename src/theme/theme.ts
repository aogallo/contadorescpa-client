import { createTheme, ThemeOptions } from '@mui/material/styles';

// Augment the theme to include custom properties
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      sidebar: {
        background: string;
        color: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      sidebar?: {
        background?: string;
        color?: string;
      };
    };
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#246dec',
      light: '#5790f0',
      dark: '#1a4ea5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dbae58',
      light: '#e4c380',
      dark: '#c9983d',
      contrastText: '#000000',
    },
    error: {
      main: '#cc4c43',
      light: '#d97168',
      dark: '#b03a32',
      contrastText: '#ffffff',
    },
    success: {
      main: '#42b883',
      light: '#68c99c',
      dark: '#30a36d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb333',
      dark: '#cc7a00',
      contrastText: '#000000',
    },
    info: {
      main: '#2196f3',
      light: '#4dabf5',
      dark: '#1769aa',
      contrastText: '#ffffff',
    },
    background: {
      default: '#e6e8ed',
      paper: '#ffffff',
    },
    text: {
      primary: '#21232d',
      secondary: '#757575',
      disabled: '#9e9e9e',
    },
    divider: '#d2d2d3',
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          letterSpacing: '0.1rem',
        },
      },
    },
  },
  custom: {
    sidebar: {
      background: '#21232d',
      color: '#9799ab',
    },
  },
};

export const theme = createTheme(themeOptions);

