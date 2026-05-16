import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { ScanResult } from '../constants/mockData';
import { ScanStatusBadge } from '../components/ScanStatusBadge';
import { RumahScoreMeter } from '../components/RumahScoreMeter';
import { GlassCard } from '../components/GlassCard';

export default function ResultScreen() {
  const { data } = useLocalSearchParams();
  const result: ScanResult = data ? JSON.parse(data as string) : null;
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!result) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Result data not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBackBtn}>
          <Ionicons name="close" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Result</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.mainCard, { opacity: fadeAnim }]}>
          <ScanStatusBadge verdict={result.verdict} />
          <RumahScoreMeter score={result.rumahScore} />
          
          <Text style={styles.summaryTitle}>AI Summary</Text>
          <Text style={styles.summaryText}>{result.summary}</Text>
        </Animated.View>

        {result.riskFactors && result.riskFactors.length > 0 && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.sectionTitle}>Detected Risks</Text>
            {result.riskFactors.map((risk, index) => (
              <GlassCard key={index} style={styles.riskCard}>
                <Ionicons name="warning" size={24} color={Colors.danger} style={{ marginTop: 2 }} />
                <Text style={styles.riskText}>{risk}</Text>
              </GlassCard>
            ))}
          </Animated.View>
        )}

        {result.recommendations && result.recommendations.length > 0 && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <GlassCard style={styles.recommendationCard}>
              {result.recommendations.map((rec, index) => (
                <View key={index} style={styles.recItem}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.safe} />
                  <Text style={styles.recText}>{rec}</Text>
                </View>
              ))}
            </GlassCard>
          </Animated.View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryAction}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryActionText}>Scan Another Listing</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryAction}
            onPress={() => router.push('/heatmap')}
          >
            <Text style={styles.secondaryActionText}>View Scam Heatmap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    color: '#FFF',
    fontSize: 18,
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(15, 22, 35, 0.9)',
    zIndex: 10,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#FFF',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  mainCard: {
    alignItems: 'center',
    backgroundColor: Colors.cardDark,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 32,
  },
  summaryTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFF',
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginTop: 16,
  },
  summaryText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textLightSecondary,
    lineHeight: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 16,
  },
  riskCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderColor: 'rgba(248, 113, 113, 0.2)',
    marginBottom: 12,
    padding: 16,
  },
  riskText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#FFF',
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  recommendationCard: {
    marginBottom: 32,
    padding: 20,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#FFF',
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  actions: {
    gap: 16,
  },
  primaryAction: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  secondaryAction: {
    backgroundColor: Colors.cardDark,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  secondaryActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
});
