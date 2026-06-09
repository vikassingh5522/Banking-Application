import { alpha, PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import { blue, green, grey, magneta, orange, red } from './colors';

declare module '@mui/material/styles' {
  interface GradientOptions {
    [key: string]: string;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    gradients?: GradientOptions;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    gradients: PaletteGradients;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface PaletteGradients {
    blueGradient: string;
    whiteGradient: string;
    whiteCardGradient: string;
    bgGradient: string;
  }
}

export type AppThemeMode = 'light' | 'dark';

export const createPalette = (mode: AppThemeMode): PaletteOptions => {
  const isDark = mode === 'dark';

  return {
    mode,
    action: {
      active: isDark ? '#CBD5E1' : grey[500],
      hover: isDark ? alpha('#CBD5E1', 0.12) : alpha(grey[600], 0.13),
      selected: isDark ? '#1E293B' : grey[100],
      disabled: isDark ? '#64748B' : grey[400],
      disabledBackground: isDark ? '#263244' : grey[200],
      focus: isDark ? '#334155' : grey[300],
      hoverOpacity: 0.05,
    },
    background: {
      default: isDark ? '#0B1220' : '#ffffff',
      paper: isDark ? '#111827' : grey[50],
    },
    neutral: {
      light: isDark ? '#1E293B' : blue[100],
      main: isDark ? '#94A3B8' : grey[600],
      dark: isDark ? '#CBD5E1' : grey[800],
      contrastText: '#ffffff',
    },
    primary: {
      lighter: isDark ? '#DBEAFE' : blue[200],
      light: isDark ? '#93C5FD' : blue[300],
      main: isDark ? '#60A5FA' : blue[500],
      dark: isDark ? '#3B82F6' : blue[800],
      darker: isDark ? '#DBEAFE' : blue[900],
      contrastText: '#ffffff',
    },
    secondary: {
      lighter: magneta[100],
      main: magneta[500],
      contrastText: magneta[50],
    },
    error: { main: red[500] },
    warning: {
      light: orange[100],
      main: orange[500],
      dark: orange[700],
      contrastText: '#ffffff',
    },
    success: {
      lighter: green[50],
      light: green[300],
      main: green[500],
      dark: green[700],
      darker: green[800],
    },
    grey,
    text: {
      primary: isDark ? '#E5E7EB' : blue[900],
      secondary: isDark ? '#A9B6C9' : blue[200],
      disabled: isDark ? '#64748B' : blue[50],
    },
    divider: isDark ? '#263244' : grey[100],
    gradients: {
      blueGradient: `linear-gradient(to top right, ${blue[700]} 30%, ${blue[600]})`,
      whiteGradient: 'linear-gradient(to bottom, rgba(255, 255, 255, .1) 0%, transparent)',
      whiteCardGradient:
        'linear-gradient(to bottom right, rgba(255, 255, 255, 0.15) 0%, transparent)',
      bgGradient: isDark
        ? 'linear-gradient(to right bottom, #0B1220, #111827)'
        : 'linear-gradient(to right bottom, #f9fafb, #E6EFF5)',
    },
  };
};

const palette = createPalette('light');

export default palette;
