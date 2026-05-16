import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors } from '../constants/colors';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  style?: any;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardDark,
    borderColor: Colors.borderDark,
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    // Add subtle shadow for light theme compatibility if needed, 
    // but the spec mentioned rgba(255,255,255,0.08) for dark.
    // For universal look on dark bg:
    overflow: 'hidden',
  },
});
