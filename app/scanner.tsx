import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { analyseRental } from '../utils/claudeApi';
import { GlassCard } from '../components/GlassCard';

export default function ScannerScreen() {
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  
  const scanAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  const handleScan = async () => {
    if (!inputUrl.trim()) return;
    
    setIsScanning(true);
    setScanStatus('Reading listing...');
    
    // Start animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    Animated.timing(scanAnim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Change status text periodically
    setTimeout(() => setScanStatus('Checking price data...'), 1000);
    setTimeout(() => setScanStatus('Scanning for red flags...'), 2000);

    // Call API
    const result = await analyseRental(inputUrl);
    
    // Stop and navigate
    setIsScanning(false);
    scanAnim.setValue(0);
    pulseAnim.setValue(1);
    
    router.push({
      pathname: '/result',
      params: { data: JSON.stringify(result) }
    });
  };

  if (isScanning) {
    return (
      <View style={styles.scanningContainer}>
        <Animated.View style={[styles.shieldPulse, { transform: [{ scale: pulseAnim }] }]}>
          <Ionicons name="shield-checkmark" size={100} color={Colors.safe} />
        </Animated.View>
        
        <Text style={styles.scanningTitle}>Analysing with AI...</Text>
        <Text style={styles.scanningStatus}>{scanStatus}</Text>
        
        <View style={styles.progressTrack}>
          <Animated.View style={[
            styles.progressFill,
            {
              width: scanAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              })
            }
          ]} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Scam Scanner</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Select Input Method</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard}>
            <Ionicons name="image-outline" size={32} color={Colors.accentStart} />
            <Text style={styles.optionText}>Screenshot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard}>
            <Ionicons name="chatbubbles-outline" size={32} color={Colors.safe} />
            <Text style={styles.optionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionCard, styles.optionActive]}>
            <Ionicons name="link-outline" size={32} color={Colors.primary} />
            <Text style={styles.optionTextActive}>Paste URL</Text>
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.inputCard}>
          <Text style={styles.inputLabel}>Rental Listing URL or Text</Text>
          <TextInput
            style={styles.input}
            placeholder="Paste URL from Mudah, PropertyGuru, iProperty..."
            placeholderTextColor={Colors.textSecondary}
            value={inputUrl}
            onChangeText={setInputUrl}
            multiline
            textAlignVertical="top"
          />
        </GlassCard>

        <TouchableOpacity 
          style={[styles.scanBtn, !inputUrl.trim() && styles.scanBtnDisabled]} 
          onPress={handleScan}
          disabled={!inputUrl.trim()}
        >
          <Text style={styles.scanBtnText}>Analyse Now</Text>
          <Ionicons name="scan-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backBtn: {
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
    flex: 1,
    padding: 24,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  optionCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: Colors.cardDark,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  optionActive: {
    backgroundColor: '#FFF',
    borderColor: Colors.primary,
  },
  optionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.textLightSecondary,
    marginTop: 8,
  },
  optionTextActive: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.primary,
    marginTop: 8,
  },
  inputCard: {
    marginBottom: 32,
  },
  inputLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FFF',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scanBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    gap: 8,
  },
  scanBtnDisabled: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  scanBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#FFF',
  },
  scanningContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  shieldPulse: {
    marginBottom: 40,
  },
  scanningTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 8,
  },
  scanningStatus: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textLightSecondary,
    marginBottom: 40,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.cardDark,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.safe,
    borderRadius: 4,
  },
});
