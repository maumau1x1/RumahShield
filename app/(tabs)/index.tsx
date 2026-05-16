import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { GlassCard } from '../../components/GlassCard';

const TIPS = [
  "Never transfer money before viewing the property.",
  "Check if the agent is registered with BOVAEA.",
  "If the price is too good to be true, it usually is.",
];

const TICKER_ALERTS = [
  "🚨 Fake Agent reported in Cheras",
  "🚨 Beware of 'deposit first' requests in PJ",
  "🚨 New scam syndicate identified in JB",
];

export default function HomeScreen() {
  const [tipIndex, setTipIndex] = useState(0);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
      
      setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % TIPS.length);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Selamat datang, Renter 👋</Text>
        <Text style={styles.subGreeting}>Stay safe in the rental market.</Text>
      </View>

      <GlassCard style={styles.insightCard}>
        <View style={styles.insightHeader}>
          <Ionicons name="bulb" size={20} color={Colors.warning} />
          <Text style={styles.insightTitle}>AI Insight</Text>
        </View>
        <Animated.Text style={[styles.insightText, { opacity: fadeAnim }]}>
          {TIPS[tipIndex]}
        </Animated.Text>
      </GlassCard>

      <View style={styles.tickerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tickerScroll}>
          {TICKER_ALERTS.map((alert, index) => (
            <View key={index} style={styles.tickerItem}>
              <Text style={styles.tickerText}>{alert}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.mainCta}
        activeOpacity={0.8}
        onPress={() => router.push('/scanner')}
      >
        <View style={styles.ctaContent}>
          <Ionicons name="scan-circle" size={32} color="#FFF" />
          <View style={styles.ctaTextContainer}>
            <Text style={styles.ctaTitle}>Scan Rental Listing</Text>
            <Text style={styles.ctaSubtitle}>Verify before you pay</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.5)" />
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/heatmap')}>
          <View style={[styles.navIconContainer, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
            <Ionicons name="map" size={24} color={Colors.accentStart} />
          </View>
          <Text style={styles.navText}>Heatmap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/report')}>
          <View style={[styles.navIconContainer, { backgroundColor: 'rgba(248, 113, 113, 0.15)' }]}>
            <Ionicons name="flag" size={24} color={Colors.danger} />
          </View>
          <Text style={styles.navText}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/scanner')}>
          <View style={[styles.navIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
            <Ionicons name="shield-checkmark" size={24} color={Colors.safe} />
          </View>
          <Text style={styles.navText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#FFF',
  },
  subGreeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textLightSecondary,
  },
  insightCard: {
    marginBottom: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
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
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
  },
  tickerContainer: {
    marginBottom: 32,
    marginHorizontal: -24, // bleed to edge
  },
  tickerScroll: {
    paddingHorizontal: 24,
  },
  tickerItem: {
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.2)',
  },
  tickerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.danger,
  },
  mainCta: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    shadowColor: Colors.accentStart,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  ctaTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#FFF',
  },
  ctaSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  sectionTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#FFF',
    marginBottom: 16,
  },
  quickNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    width: '30%',
  },
  navIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  navText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FFF',
  },
});
