import { StyleSheet } from 'react-native';
import { VictoryBar, VictoryLine, VictoryPie } from 'victory-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

// Keep the rest of your analytics.tsx code unchanged

// Dummy data
const weeklyData = [
  { day: 'Mon', incidents: 4 },
  { day: 'Tue', incidents: 2 },
  { day: 'Wed', incidents: 5 },
  { day: 'Thu', incidents: 3 },
  { day: 'Fri', incidents: 7 },
  { day: 'Sat', incidents: 6 },
  { day: 'Sun', incidents: 1 },
];

const cameraData = [
  { camera: 'Entrance', incidents: 12 },
  { camera: 'Parking', incidents: 8 },
  { camera: 'Lobby', incidents: 4 },
  { camera: 'Backyard', incidents: 6 },
];

const incidentTypes = [
  { type: 'Theft', count: 15 },
  { type: 'Vandalism', count: 7 },
  { type: 'Unauthorized', count: 9 },
];

export default function AnalyticsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1a1a1a', dark: '#000' }}
      headerImage={null}>
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Security Dashboard
        </ThemedText>

        {/* Summary Cards */}
        <ThemedView style={styles.cardRow}>
          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>Today's Incidents</ThemedText>
            <ThemedText type="title" style={styles.cardValue}>3</ThemedText>
          </ThemedView>

          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>Weekly Total</ThemedText>
            <ThemedText type="title" style={styles.cardValue}>28</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Time Trend Graph */}
        <ThemedView style={styles.chartContainer}>
          <ThemedText type="subtitle" style={styles.chartTitle}>
            Incident Trend (Last 7 Days)
          </ThemedText>
          <VictoryLine
            data={weeklyData}
            x="day"
            y="incidents"
            style={{
              data: { stroke: '#ff4757' },
              labels: { fill: '#fff' },
              parent: { border: '1px solid #ccc' }
            }}
            animate={{ duration: 500 }}
          />
        </ThemedView>

        {/* Camera-wise Distribution */}
        <ThemedView style={styles.chartContainer}>
          <ThemedText type="subtitle" style={styles.chartTitle}>
            Incidents by Camera
          </ThemedText>
          <VictoryBar
            data={cameraData}
            x="camera"
            y="incidents"
            style={{
              data: { fill: '#2ed573' },
              labels: { fill: '#fff' }
            }}
            animate={{ duration: 500 }}
          />
        </ThemedView>

        {/* Incident Type Breakdown */}
        <ThemedView style={styles.chartContainer}>
          <ThemedText type="subtitle" style={styles.chartTitle}>
            Incident Types
          </ThemedText>
          <VictoryPie
            data={incidentTypes}
            x="type"
            y="count"
            colorScale={['#ffa502', '#ff6b81', '#70a1ff']}
            innerRadius={50}
            labelRadius={80}
            style={{ labels: { fill: 'white', fontSize: 14 } }}
            animate={{ duration: 500 }}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 24,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
  },
  cardTitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    color: '#fff',
    fontSize: 24,
  },
  chartContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  chartTitle: {
    color: '#fff',
    marginBottom: 12,
  },
});