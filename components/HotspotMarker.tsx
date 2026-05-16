import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  intensity?: number;
}

export const HotspotMarker: React.FC<Props> = ({ intensity = 1 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Scale size based on intensity (number of reports)
  const baseSize = 20 + Math.min(intensity, 50) * 0.5;

  return (
    <View style={[styles.container, { width: baseSize * 2, height: baseSize * 2 }]}>
      <Animated.View 
        style={[
          styles.glow, 
          { 
            width: baseSize * 2, 
            height: baseSize * 2, 
            borderRadius: baseSize,
            transform: [{ scale: pulseAnim }],
            opacity: pulseAnim.interpolate({
              inputRange: [1, 1.5],
              outputRange: [0.5, 0]
            })
          }
        ]} 
      />
      <View style={[styles.core, { width: baseSize, height: baseSize, borderRadius: baseSize / 2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    backgroundColor: Colors.danger,
    position: 'absolute',
  },
  core: {
    backgroundColor: Colors.danger,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
