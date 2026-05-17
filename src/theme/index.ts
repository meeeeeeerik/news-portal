import { createTheme } from '@mui/material/styles';
import type { Category } from '../types';

export const getTheme = (dark: boolean) =>
  createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      primary: { main: '#E63946' },
      secondary: { main: '#457B9D' },
      background: {
        default: dark ? '#0A0C10' : '#F8F9FC',
        paper: dark ? '#13161E' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: '"Merriweather Sans", "Georgia", serif',
      h1: { fontWeight: 900 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: dark ? '0 2px 16px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.06)',
          },
        },
      },
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 700, borderRadius: 8 } },
      },
      MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    },
  });

export const CATEGORY_COLORS: Record<Category, string> = {
  all: '#6C63FF',
  technology: '#457B9D',
  business: '#2D6A4F',
  sports: '#E63946',
  science: '#7B2D8B',
  health: '#2D9B6C',
  entertainment: '#E07B39',
  politics: '#C1440E',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All News',
  technology: 'Technology',
  business: 'Business',
  sports: 'Sports',
  science: 'Science',
  health: 'Health',
  entertainment: 'Entertainment',
  politics: 'Politics',
};
