import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useSettings } from '@/contexts/SettingsContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const { isMonitoringActive, toggleMonitoring } = useSettings();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1a1a1a', dark: '#000' }}
      headerImage={null}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            User Profile
          </ThemedText>
          <ThemedView style={styles.profileCard}>
            <ThemedText style={styles.profileText}>Name: Admin User</ThemedText>
            <ThemedText style={styles.profileText}>Email: admin@security.com</ThemedText>
            <ThemedText style={styles.profileText}>Role: System Administrator</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            System Controls
          </ThemedText>
          <ThemedView style={styles.controlItem}>
            <ThemedText style={styles.controlText}>
              Monitoring Status: {isMonitoringActive ? 'Active' : 'Inactive'}
            </ThemedText>
            <TouchableOpacity
              onPress={toggleMonitoring}
              style={[
                styles.toggleButton,
                { backgroundColor: isMonitoringActive ? '#2ed573' : '#ff4757' }
              ]}
            >
              <ThemedText style={styles.toggleText}>
                {isMonitoringActive ? 'ACTIVE' : 'INACTIVE'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/notifications')}
          >
            <ThemedText style={styles.buttonText}>Notification Settings</ThemedText>
            <MaterialIcons name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsButton}>
            <ThemedText style={styles.buttonText}>User Management</ThemedText>
            <MaterialIcons name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsButton}>
            <ThemedText style={styles.buttonText}>System Diagnostics</ThemedText>
            <MaterialIcons name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#2ed573',
  },
  profileCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
  },
  profileText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  controlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  controlText: {
    fontSize: 14,
    color: '#fff',
  },
  toggleButton: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  toggleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});