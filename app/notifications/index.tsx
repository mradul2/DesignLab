import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Contact = {
  id: string;
  phone: string;
};

export default function NotificationSettings() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newNumber, setNewNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://192.168.0.121:3000/api/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/[^\d]/g, '');
    return cleaned.length === 10;
  };

  const handleAddContact = async () => {
    if (!validatePhoneNumber(newNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.121:3000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: "+91" + newNumber })
      });
      
      if (!response.ok) throw new Error('Failed to save contact');
      setNewNumber('');
      await fetchContacts();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const response = await fetch(`http://192.168.0.121:3000/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      await fetchContacts();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleTestAlert = async () => {
    try {
      const response = await fetch('http://192.168.0.121:3000/api/send-alert', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to send test alert');
      Alert.alert('Success', 'Test alerts sent to all contacts');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ed573" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      
      <View style={styles.addSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter 10-digit phone number"
          placeholderTextColor="#666"
          value={newNumber}
          onChangeText={text => setNewNumber(text.replace(/[^\d]/g, ''))}
          keyboardType="phone-pad"
          maxLength={10}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactItem}>
            <Text style={styles.contactNumber}>
              {contact.phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')}
            </Text>
            <TouchableOpacity 
              onPress={() => handleDeleteContact(contact.id)}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={20} color="#ff4757" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.testButton}
        onPress={handleTestAlert}
        disabled={contacts.length === 0}
      >
        <Text style={styles.testButtonText}>Test SMS Alert</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 25,
  },
  addSection: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    padding: 12,
    color: '#2d3436',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dfe6e9',
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
    gap: 10,
    marginBottom: 20,
  },
  contactItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  contactNumber: {
    color: '#2d3436',
    fontSize: 16,
  },
  deleteButton: {
    padding: 4,
  },
  testButton: {
    backgroundColor: '#2ed573',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  testButtonText: {
    color: 'white',
    fontWeight: '600',
  }
});
