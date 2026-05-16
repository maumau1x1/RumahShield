import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import { GlassCard } from '../../components/GlassCard';

const CATEGORIES = ['Fake Listing', 'Fake Agent', 'Price Scam', 'Identity Fraud', 'Other'];
const MAX_CHARS = 300;

export default function ReportScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const successScale = useRef(new Animated.Value(0)).current;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!category || description.length === 0) return;

    setIsSubmitted(true);
    Animated.spring(successScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setImage(null);
      setCategory(null);
      setDescription('');
      successScale.setValue(0);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <View style={styles.successContainer}>
        <Animated.View style={{ transform: [{ scale: successScale }], alignItems: 'center' }}>
          <View style={styles.successIconBg}>
            <Ionicons name="shield-checkmark" size={80} color={Colors.safe} />
          </View>
          <Text style={styles.successTitle}>Report Submitted!</Text>
          <Text style={styles.successMessage}>
            Thank you for keeping Malaysia safe. Your report helps our AI protect others.
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Report a Scam</Text>
          <Text style={styles.headerSubtitle}>Help the community by reporting suspicious activities.</Text>
        </View>

        <Text style={styles.sectionTitle}>Evidence (Optional)</Text>
        <TouchableOpacity style={styles.imageUploadBtn} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={32} color={Colors.textSecondary} />
              <Text style={styles.uploadText}>Upload Screenshot</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Scam Category</Text>
        <View style={styles.chipsContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, category === cat && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <GlassCard style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="What happened? Briefly describe the suspicious activity."
            placeholderTextColor={Colors.textSecondary}
            value={description}
            onChangeText={(text) => {
              if (text.length <= MAX_CHARS) setDescription(text);
            }}
            multiline
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {description.length}/{MAX_CHARS}
          </Text>
        </GlassCard>

        <TouchableOpacity 
          style={[styles.submitBtn, (!category || description.length === 0) && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!category || description.length === 0}
        >
          <Text style={styles.submitBtnText}>Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#FFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textLightSecondary,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 12,
  },
  imageUploadBtn: {
    height: 120,
    backgroundColor: Colors.cardDark,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.borderDark,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.cardDark,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  chipActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: Colors.primary,
  },
  chipText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textLightSecondary,
  },
  chipTextActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.accentStart,
  },
  inputCard: {
    padding: 0,
    marginBottom: 32,
  },
  input: {
    height: 150,
    padding: 16,
    color: '#FFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  charCount: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  submitBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#FFF',
  },
  successContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  successIconBg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textLightSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
