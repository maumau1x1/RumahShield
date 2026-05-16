import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  score: number;
}

export const RumahScoreMeter: React.FC<Props> = ({ score }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    const listener = animatedValue.addListener(({ value }) => {
      setDisplayScore(Math.round(value));
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [score]);

  let meterColor = Colors.danger;
  if (score >= 90) meterColor = Colors.safe;
  else if (score >= 60) meterColor = Colors.warning;

  // For a semi-circle:
  // We use a 200x200 circle, clipped to 200x100.
  // We have a base circle (track) rotated 45deg so top/right borders form the top half.
  // The fill circle rotates from -135deg (hidden) to 45deg (full).
  const rotate = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['-135deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.meterContainer}>
        {/* Track */}
        <View style={[styles.circle, styles.track]} />
        
        {/* Fill */}
        <Animated.View style={[
          styles.circle, 
          styles.fill, 
          { 
            borderTopColor: meterColor, 
            borderRightColor: meterColor,
            transform: [{ rotate }]
          }
        ]} />
        
        <View style={styles.innerContent}>
          <Text style={[styles.scoreText, { color: meterColor }]}>{displayScore}</Text>
          <Text style={styles.scoreLabel}>RumahScore™</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 30,
  },
  meterContainer: {
    width: 240,
    height: 120, // Half height to clip the circle
    overflow: 'hidden',
    alignItems: 'center',
  },
  circle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 20,
    position: 'absolute',
    top: 0,
  },
  track: {
    borderColor: 'rgba(255,255,255,0.05)',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  fill: {
    borderColor: 'transparent',
  },
  innerContent: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  scoreText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 56,
    lineHeight: 64,
  },
  scoreLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.textLightSecondary,
  },
});
