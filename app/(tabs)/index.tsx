import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { useSettings } from '@/contexts/SettingsContext';

export default function HomeScreen() {
  // const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const { isMonitoringActive } = useSettings();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f0f0f0', dark: '#1D1D1D' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        {/* Monitoring Status Box */}
        <ThemedView style={styles.statusContainer}>
          <ThemedView style={[
            styles.statusDot,
            { backgroundColor: isMonitoringActive ? '#2ed573' : '#ff4757' }
          ]} />
          <ThemedText type="defaultSemiBold" style={styles.statusText}>
            System Status: {isMonitoringActive ? 'ACTIVE' : 'DEACTIVATED'}
          </ThemedText>
        </ThemedView>

        {/* Action Buttons */}
        <ThemedView style={styles.buttonContainer}>
          <Link href="/camera-feeds" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                View Camera Feeds
              </ThemedText>
            </TouchableOpacity>
          </Link>
          
          <Link href="/analytics" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                View Analytics
              </ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/gallery" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                View Gallery
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  headerImage: {
    height: 100,
    width: 100,
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.3,
  },
});