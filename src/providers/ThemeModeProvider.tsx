import { CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { createAppTheme } from 'theme/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const storageKey = 'bankdash-theme-mode';
const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

function getInitialMode(): ThemeMode {
  const storedMode = localStorage.getItem(storageKey);
  return storedMode === 'dark' ? 'dark' : 'light';
}

export const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  const setMode = (nextMode: ThemeMode) => {
    localStorage.setItem(storageKey, nextMode);
    setModeState(nextMode);
  };

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode(mode === 'dark' ? 'light' : 'dark'),
    }),
    [mode],
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used inside ThemeModeProvider.');
  }

  return context;
}
