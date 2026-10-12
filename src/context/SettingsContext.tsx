import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, AppTheme } from '../theme/themes';

export type ThemeMode = 'light' | 'dark';
export type FontScale = 'small' | 'normal' | 'large';

export type Settings = {
  theme: ThemeMode;
  fontScale: FontScale;
};

type SettingsContextValue = Settings & {
  colors: AppTheme;
  setTheme: (value: ThemeMode) => void;
  setFontScale: (value: FontScale) => void;
  resetSettings: () => void;
};

const STORAGE_KEY = '@campus_hub_settings';
const initialSettings: Settings = {
  theme: 'light',
  fontScale: 'normal',
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setSettings(JSON.parse(saved));
      setIsReady(true);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, isReady]);

  const setTheme = (theme: ThemeMode) =>
    setSettings(current => ({ ...current, theme }));

  const setFontScale = (fontScale: FontScale) =>
    setSettings(current => ({ ...current, fontScale }));

  const resetSettings = () =>
    setSettings(initialSettings);

  const colors = themes[settings.theme];

  return (
    <SettingsContext.Provider value={{
      ...settings, colors,
      setTheme, setFontScale, resetSettings,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) {
    throw new Error('useSettings must be inside SettingsProvider');
  }
  return value;
}