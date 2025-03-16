import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Contact = {
  id: string;
  phone: string;
};

type SettingsContextType = {
  isDarkMode: boolean;
  toggleTheme: () => Promise<void>;
  isMonitoringActive: boolean;
  toggleMonitoring: () => Promise<void>;
  notificationContacts: Contact[];
  addContact: (phone: string) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType>({
  isDarkMode: true,
  toggleTheme: async () => {},
  isMonitoringActive: true,
  toggleMonitoring: async () => {},
  notificationContacts: [],
  addContact: async () => {},
  removeContact: async () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [notificationContacts, setNotificationContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const loadState = async () => {
      const [savedTheme, savedState, savedContacts] = await Promise.all([
        AsyncStorage.getItem('darkMode'),
        AsyncStorage.getItem('monitoringActive'),
        AsyncStorage.getItem('notificationContacts'),
      ]);
      
      if (savedTheme !== null) setIsDarkMode(savedTheme === 'true');
      if (savedState !== null) setIsMonitoringActive(savedState === 'true');
      if (savedContacts) setNotificationContacts(JSON.parse(savedContacts));
    };
    loadState();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('darkMode', newTheme.toString());
  };

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
        isDarkMode,
        toggleTheme,
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