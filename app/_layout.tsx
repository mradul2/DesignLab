import { Stack } from 'expo-router';
import { SettingsProvider } from '@/contexts/SettingsContext';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="gallery/index" 
          options={{ 
            title: 'Incident Gallery',
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="gallery/[id]" 
          options={{ 
            title: 'Incident Details',
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="notifications/index" 
          options={{ 
            title: 'Notification Settings',
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
    </SettingsProvider>
  );
}