import { ReactElement, ReactNode } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { es } from 'date-fns/locale';
import { BrowserRouter } from 'react-router-dom';

// Create a custom theme for testing if needed
const testTheme = {
  palette: {
    primary: {
      main: '#246dec',
    },
    secondary: {
      main: '#dbae58',
    },
  },
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface AllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const testQueryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>
        <ThemeProvider theme={testTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export testing library utilities (excluding render to avoid conflicts)
export { screen, waitFor, within, fireEvent } from '@testing-library/react';
// Export custom render with all providers
export { customRender as render };
export { createTestQueryClient };

