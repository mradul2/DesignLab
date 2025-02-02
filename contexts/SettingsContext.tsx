import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Contact = {
  id: string;
  phone: string;
};

type SettingsContextType = {
  isMonitoringActive: boolean;
  toggleMonitoring: () => Promise<void>;
  notificationContacts: Contact[];
  addContact: (phone: string) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType>({
  isMonitoringActive: true,
  toggleMonitoring: async () => {},
  notificationContacts: [],
  addContact: async () => {},
  removeContact: async () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [notificationContacts, setNotificationContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const loadState = async () => {
      const [savedState, savedContacts] = await Promise.all([
        AsyncStorage.getItem('monitoringActive'),
        AsyncStorage.getItem('notificationContacts'),
      ]);
      
      if (savedState !== null) setIsMonitoringActive(savedState === 'true');
      if (savedContacts) setNotificationContacts(JSON.parse(savedContacts));
    };
    loadState();
  }, []);

  const toggleMonitoring = async () => {
    const newState = !isMonitoringActive;
    setIsMonitoringActive(newState);
    await AsyncStorage.setItem('monitoringActive', newState.toString());
  };

  const addContact = async (phone: string) => {
    const newContact = {
      id: Date.now().toString(),
      phone: phone.replace(/[^\d]/g, '')
    };
    
    const updatedContacts = [...notificationContacts, newContact];
    setNotificationContacts(updatedContacts);
    await AsyncStorage.setItem('notificationContacts', JSON.stringify(updatedContacts));
  };

  const removeContact = async (id: string) => {
    const updatedContacts = notificationContacts.filter(contact => contact.id !== id);
    setNotificationContacts(updatedContacts);
    await AsyncStorage.setItem('notificationContacts', JSON.stringify(updatedContacts));
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        isMonitoringActive,
        toggleMonitoring,
        notificationContacts,
        addContact,
        removeContact
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};