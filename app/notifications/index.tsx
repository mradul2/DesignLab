import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '@/contexts/SettingsContext';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useRouter } from 'expo-router';

export default function NotificationSettings() {
  const router = useRouter();
  const { notificationContacts, addContact, removeContact } = useSettings();
  const [newNumber, setNewNumber] = useState('');

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/[^\d]/g, '');
    return cleaned.length >= 10;
  };

  const handleAddContact = async () => {
    if (!validatePhoneNumber(newNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number');
      return;
    }
    
    await addContact(newNumber);
    setNewNumber('');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1a1a1a', dark: '#000' }}
      headerImage={null}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.addSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="#888"
            value={newNumber}
            onChangeText={setNewNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.listContainer}>
          {notificationContacts.map((contact) => (
            <ThemedView key={contact.id} style={styles.contactItem}>
              <ThemedText style={styles.contactNumber}>
                {contact.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
              </ThemedText>
              <TouchableOpacity 
                onPress={() => removeContact(contact.id)}
                style={styles.deleteButton}
              >
                <MaterialIcons name="delete" size={20} color="#ff4757" />
              </TouchableOpacity>
            </ThemedView>
          ))}
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
  addSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2ed573',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  listContainer: {
    gap: 8,
  },
  contactItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactNumber: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    padding: 4,
  },
});