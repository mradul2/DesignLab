import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useSettings } from '@/contexts/SettingsContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, isMonitoringActive, toggleMonitoring } = useSettings();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      marginBottom: 12,
      color: Colors[isDarkMode ? 'dark' : 'light'].primary,
    },
    profileCard: {
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].cardBackground,
      borderRadius: 8,
      padding: 16,
      ...Platform.select({
        android: { elevation: 2 },
        ios: {
          shadowColor: Colors[isDarkMode ? 'dark' : 'light'].elevation,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }),
    },
    profileText: {
      fontSize: 14,
      color: Colors[isDarkMode ? 'dark' : 'light'].text,
      marginBottom: 8,
    },
    controlItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].cardBackground,
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      ...Platform.select({
        android: { elevation: 1 },
        ios: {
          shadowColor: Colors[isDarkMode ? 'dark' : 'light'].elevation,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
      }),
    },
    controlText: {
      fontSize: 14,
      color: Colors[isDarkMode ? 'dark' : 'light'].text,
    },
    toggleButton: {
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].primary,
    },
    toggleText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    settingsButton: {
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].cardBackground,
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...Platform.select({
        android: { elevation: 1 },
        ios: {
          shadowColor: Colors[isDarkMode ? 'dark' : 'light'].elevation,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
      }),
    },
    buttonText: {
      color: Colors[isDarkMode ? 'dark' : 'light'].text,
      fontSize: 14,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].cardBackground,
      borderRadius: 8,
      padding: 16,
      ...Platform.select({
        android: { elevation: 1 },
        ios: {
          shadowColor: Colors[isDarkMode ? 'dark' : 'light'].elevation,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
      }),
    },
    themeText: {
      color: Colors[isDarkMode ? 'dark' : 'light'].text,
      fontSize: 16,
    },
    errorText: {
      color: '#ff4757',
      fontSize: 16,
      textAlign: 'center',
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background,
    },
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 10,
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

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ParallaxScrollView
        headerBackgroundColor={{ 
          light: Colors.light.background, 
          dark: Colors.dark.background 
        }}
        headerImage={null}
      >
        <ThemedView style={styles.container}>
          {/* Appearance Section */}
          <ThemedView style={styles.section}>
            <ThemedText type="title" style={styles.sectionTitle}>
              Appearance
            </ThemedText>
            <TouchableOpacity
              style={styles.themeToggle}
              onPress={toggleTheme}
            >
              <MaterialIcons 
                name={isDarkMode ? 'nights-stay' : 'wb-sunny'} 
                size={24} 
                color={Colors[isDarkMode ? 'dark' : 'light'].primary} 
              />
              <ThemedText style={styles.themeText}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* User Profile Section */}
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

          {/* System Controls Section */}
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
                  { backgroundColor: isMonitoringActive ? Colors[isDarkMode ? 'dark' : 'light'].primary : '#ff4757' }
                ]}
              >
                <ThemedText style={styles.toggleText}>
                  {isMonitoringActive ? 'ACTIVE' : 'INACTIVE'}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          {/* Additional Settings Section */}
          <ThemedView style={styles.section}>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => router.push('/notifications')}
            >
              <ThemedText style={styles.buttonText}>Notification Settings</ThemedText>
              <MaterialIcons 
                name="chevron-right" 
                size={20} 
                color={Colors[isDarkMode ? 'dark' : 'light'].textSecondary} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsButton}>
              <ThemedText style={styles.buttonText}>User Management</ThemedText>
              <MaterialIcons 
                name="chevron-right" 
                size={20} 
                color={Colors[isDarkMode ? 'dark' : 'light'].textSecondary} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsButton}>
              <ThemedText style={styles.buttonText}>System Diagnostics</ThemedText>
              <MaterialIcons 
                name="chevron-right" 
                size={20} 
                color={Colors[isDarkMode ? 'dark' : 'light'].textSecondary} 
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}
