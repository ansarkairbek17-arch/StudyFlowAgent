import React from 'react';
import { SettingsProvider } from './src/context/SettingsContext';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  return (
    <SettingsProvider>
      <SettingsScreen />
    </SettingsProvider>
  );
}