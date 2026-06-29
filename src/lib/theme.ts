export const ACCENT_THEMES = {
  green: {
    name: 'Neon Green',
    color: '#A8FF3E',
    hover: '#BFFF5A',
    dim: '#7ACC2A',
    rgb: '168, 255, 62',
  },
  orange: {
    name: 'Orange',
    color: '#FF6B2B',
    hover: '#FF8A57',
    dim: '#CC5522',
    rgb: '255, 107, 43',
  },
  blue: {
    name: 'Blue',
    color: '#60A5FA',
    hover: '#93C5FD',
    dim: '#3B82F6',
    rgb: '96, 165, 250',
  },
  purple: {
    name: 'Purple',
    color: '#A78BFA',
    hover: '#C4B5FD',
    dim: '#8B5CF6',
    rgb: '167, 139, 250',
  },
} as const;

export type AccentTheme = keyof typeof ACCENT_THEMES;

export const ACCENT_THEME_STORAGE_KEY = 'appearance-accent-theme';
export const ACCENT_THEME_EVENT = 'appearance-theme-change';
export const DEFAULT_ACCENT_THEME: AccentTheme = 'green';

export function isAccentTheme(value: string | null | undefined): value is AccentTheme {
  return Boolean(value && value in ACCENT_THEMES);
}

export function getStoredAccentTheme(): AccentTheme {
  if (typeof window === 'undefined') {
    return DEFAULT_ACCENT_THEME;
  }

  const storedTheme = window.localStorage.getItem(ACCENT_THEME_STORAGE_KEY);
  return isAccentTheme(storedTheme) ? storedTheme : DEFAULT_ACCENT_THEME;
}

export function applyAccentTheme(theme: AccentTheme) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-accent-theme', theme);
}

export function persistAccentTheme(theme: AccentTheme) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ACCENT_THEME_STORAGE_KEY, theme);
  applyAccentTheme(theme);
  window.dispatchEvent(new CustomEvent(ACCENT_THEME_EVENT, { detail: theme }));
}
