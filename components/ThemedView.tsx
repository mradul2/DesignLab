import React, { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';
import { useSettings } from '@/contexts/SettingsContext';

export const ThemedView = forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    const { isDarkMode } = useSettings();
    return (
      <View
        ref={ref}
        style={[
          { backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' },
          style
        ]}
        {...props}
      />
    );
  }
);

ThemedView.displayName = 'ThemedView';
