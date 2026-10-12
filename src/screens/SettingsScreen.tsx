import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useSettings, FontScale } from '../context/SettingsContext';

export default function SettingsScreen() {
  const { theme, fontScale, colors, setTheme, setFontScale, resetSettings } = useSettings();

  const fontSizes: Record<FontScale, number> = {
    small: 14,
    normal: 17,
    large: 21,
  };

  const fontSize = fontSizes[fontScale];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text, fontSize: fontSize + 4 }]}>
        Қосымша баптаулары
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text, fontSize }]}>Қараңғы фон</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(enabled) => setTheme(enabled ? 'dark' : 'light')}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text, fontSize }]}>Қаріп өлшемі</Text>
        <View style={styles.fontButtons}>
          {(['small', 'normal', 'large'] as const).map((scale) => (
            <TouchableOpacity
              key={scale}
              style={[
                styles.fontBtn,
                { backgroundColor: fontScale === scale ? colors.primary : '#ccc' }
              ]}
              onPress={() => setFontScale(scale)}
            >
              <Text style={styles.fontBtnText}>
                {scale === 'small' ? 'A−' : scale === 'normal' ? 'A' : 'A+'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.resetBtn, { backgroundColor: colors.primary }]} 
        onPress={resetSettings}
      >
        <Text style={styles.resetText}>Бастапқы күйге қайтару</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  label: { fontWeight: '500' },
  fontButtons: { flexDirection: 'row', gap: 8 },
  fontBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  fontBtnText: { color: '#fff', fontWeight: 'bold' },
  resetBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  resetText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});