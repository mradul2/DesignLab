import { useState, useEffect } from 'react';
import { StyleSheet, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type ImageItem = {
  id: string;
  url: string;
  timestamp: string;
  camera: string;
};

export default function GalleryScreen() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Image',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: async () => {
            try {
              await fetch(`http://192.168.0.121:3000/api/gallery/${id}`, {
                method: 'DELETE'
              });
              setImages(prev => prev.filter(img => img.id !== id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete image');
            }
          }
        }
      ]
    );
  };

  const loadGallery = async () => {
    try {
      const response = await fetch('http://192.168.0.121:3000/api/gallery');
      if (!response.ok) throw new Error('Server error');
      
      const data = await response.json();
      setImages(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.grid}>
      {images.map((img) => (
        <ThemedView key={img.id} style={styles.imageContainer}>
          <Link href={`/gallery/${img.id}`} asChild>
            <TouchableOpacity>
              <Image
                source={{ uri: img.url }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDelete(img.id)}
          >
            <ThemedText style={styles.deleteText}>×</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.cameraText}>{img.camera}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    zIndex: 1,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 18,
  },
  cameraText: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    color: 'white',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 2,
  }
});
