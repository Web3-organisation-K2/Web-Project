'use client';

import { useEffect } from 'react';
import {
  ACCENT_THEME_STORAGE_KEY,
  ACCENT_THEME_EVENT,
  AccentTheme,
  applyAccentTheme,
  getStoredAccentTheme,
  isAccentTheme,
} from '@/lib/theme';

export default function ThemeController() {
  useEffect(() => {
    const syncTheme = () => {
      applyAccentTheme(getStoredAccentTheme());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== ACCENT_THEME_STORAGE_KEY) {
        return;
      }

      syncTheme();
    };

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<AccentTheme>).detail;
      if (isAccentTheme(nextTheme)) {
        applyAccentTheme(nextTheme);
      }
    };

    syncTheme();
    window.addEventListener('storage', handleStorage);
    window.addEventListener(ACCENT_THEME_EVENT, handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(ACCENT_THEME_EVENT, handleThemeChange);
    };
  }, []);

  return null;
}
