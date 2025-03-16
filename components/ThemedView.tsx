import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { useSettings } from '@/contexts/SettingsContext';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, children }) {
  const { isDarkMode } = useSettings();
  return (
    <View style={[{ 
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background,
      flex: 1 
    }, style]}>
      {children}
    </View>
  );
}