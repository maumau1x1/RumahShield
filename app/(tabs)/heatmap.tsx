import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { Colors } from '../../constants/colors';
import { hotspotData } from '../../constants/mockData';
import { HotspotMarker } from '../../components/HotspotMarker';
import { GlassCard } from '../../components/GlassCard';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const INITIAL_REGION = {
  latitude: 4.2105,
  longitude: 101.9758,
  latitudeDelta: 8,
  longitudeDelta: 8,
};

export default function HeatmapScreen() {
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);

  const totalReports = hotspotData.reduce((sum, item) => sum + item.count, 0);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        provider={PROVIDER_DEFAULT}
        userInterfaceStyle="dark"
        customMapStyle={mapStyleDark}
      >
        {hotspotData.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lng }}
            onPress={() => setSelectedHotspot(spot)}
          >
            <HotspotMarker intensity={spot.count} />
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{spot.city}</Text>
                <Text style={styles.calloutText}>{spot.count} Reports</Text>
                <View style={styles.calloutBadge}>
                  <Text style={styles.calloutBadgeText}>{spot.topScam}</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.topOverlay}>
        <Text style={styles.headerTitle}>Scam Heatmap</Text>
        <GlassCard style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Ionicons name="bulb" size={20} color={Colors.warning} />
            <Text style={styles.insightTitle}>Area Alert</Text>
          </View>
          <Text style={styles.insightText}>
            Klang Valley shows high concentration of "Fake Agent" scams. Always verify REN numbers.
          </Text>
        </GlassCard>
      </View>

      <View style={styles.bottomOverlay}>
        <GlassCard style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statsLabel}>Total Reports</Text>
              <Text style={styles.statsValue}>{totalReports}</Text>
            </View>
            <View style={styles.statsDivider} />
            <View>
              <Text style={styles.statsLabel}>Top Threat</Text>
              <Text style={styles.statsValueThreat}>Fake Agent</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  map: {
    width,
    height,
  },
  topOverlay: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  insightCard: {
    backgroundColor: 'rgba(15, 22, 35, 0.85)',
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.warning,
    marginLeft: 8,
  },
  insightText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#FFF',
    lineHeight: 20,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  statsCard: {
    backgroundColor: 'rgba(15, 22, 35, 0.95)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statsDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderDark,
  },
  statsLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textLightSecondary,
    marginBottom: 4,
  },
  statsValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#FFF',
  },
  statsValueThreat: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: Colors.danger,
  },
  calloutContainer: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  calloutTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  calloutText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  calloutBadge: {
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  calloutBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.danger,
  },
});

// A simple dark map style to match the app aesthetic
const mapStyleDark = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#242f3e"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#746855"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#242f3e"}]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#d59563"}]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#d59563"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#263c3f"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#6b9a76"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#38414e"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#212a37"}]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#9ca5b3"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#17263c"}]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#515c6d"}]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#17263c"}]
  }
];
