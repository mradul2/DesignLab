import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert, SectionList } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type ImageItem = {
  id: string;
  image: any;
  timestamp: Date;
  camera: string;
};

const incident1 = require('@/assets/images/incident1.png');
const incident2 = require('@/assets/images/incident2.png');
const incident3 = require('@/assets/images/incident3.png');

const initialImages: ImageItem[] = [
  {
    id: '1',
    image: incident1,
    timestamp: new Date('2024-03-15T14:30:00'),
    camera: 'Entrance'
  },
  {
    id: '2',
    image: incident2,
    timestamp: new Date('2024-03-15T15:45:00'),
    camera: 'Parking'
  },
  {
    id: '3',
    image: incident3,
    timestamp: new Date('2024-03-14T09:15:00'),
    camera: 'Lobby'
  },
];

const groupImagesByDate = (images: ImageItem[]) => {
  const grouped: { [key: string]: ImageItem[] } = {};

  images.forEach(img => {
    const date = img.timestamp.toISOString().split('T')[0];
    grouped[date] = grouped[date] || [];
    grouped[date].push(img);
  });

  return Object.entries(grouped).map(([date, items]) => ({
    title: formatSectionTitle(date),
    data: items,
  }));
};

const formatSectionTitle = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function GalleryScreen() {
  const [images, setImages] = useState(initialImages);
  const sections = groupImagesByDate(images.sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  ));

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Image',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => setImages(prev => prev.filter(img => img.id !== id)) }
      ]
    );
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.imageContainer}>
            <Link href={`/gallery/${item.id}`} asChild>
              <TouchableOpacity>
                <Image source={item.image} style={styles.image} />
              </TouchableOpacity>
            </Link>
            
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <ThemedText style={styles.deleteText}>×</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
          </ThemedView>
        )}
        numColumns={3}
        contentContainerStyle={styles.container}
        stickySectionHeadersEnabled={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  imageContainer: {
    width: '33.33%',
    padding: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,0,0,0.7)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 18,
  },
  sectionHeader: {
    padding: 8,
    backgroundColor: '#2a2a2a',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});