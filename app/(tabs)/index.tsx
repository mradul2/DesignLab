import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useSettings } from '@/contexts/SettingsContext';

export default function HomeScreen() {
  const { isMonitoringActive } = useSettings();
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch('http://192.168.0.121:3000/api/streams') ;
        const data = await response.json();
        setCameras(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ed573" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Failed to load cameras: {error}
        </ThemedText>
      </ThemedView>
    );
  }

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

        {/* Camera List */}
        <ThemedView style={styles.cameraList}>
          {cameras.map((camera) => (
            <Link 
              key={camera.id} 
              href={{
                pathname: "/camera-feed/[id]",
                params: { id: camera.id }
              }} 
              asChild
            >
              <TouchableOpacity style={styles.cameraCard}>
                <ThemedText type="defaultSemiBold" style={styles.cameraName}>
                  {camera.name}
                </ThemedText>
                <ThemedText style={styles.cameraStatus}>
                  {isMonitoringActive ? 'Live' : 'Offline'}
                </ThemedText>
              </TouchableOpacity>
            </Link>
          ))}
        </ThemedView>

        {/* Action Buttons */}
        <ThemedView style={styles.buttonContainer}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff4757',
    textAlign: 'center',
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
  cameraList: {
    gap: 12,
    marginBottom: 20,
  },
  cameraCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
  },
  cameraName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  cameraStatus: {
    color: '#888',
    fontSize: 14,
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