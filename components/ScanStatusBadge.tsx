import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { ScanResult } from '../constants/mockData';

interface Props {
  verdict: ScanResult['verdict'];
}

export const ScanStatusBadge: React.FC<Props> = ({ verdict }) => {
  let bgColor, textColor, iconName, label;

  switch (verdict) {
    case 'SAFE':
      bgColor = 'rgba(16, 185, 129, 0.15)';
      textColor = Colors.safe;
      iconName = 'shield-checkmark';
      label = 'SAFE';
      break;
    case 'SUSPICIOUS':
      bgColor = 'rgba(245, 158, 11, 0.15)';
      textColor = Colors.warning;
      iconName = 'warning';
      label = 'SUSPICIOUS';
      break;
    case 'HIGH_RISK':
      bgColor = 'rgba(248, 113, 113, 0.15)';
      textColor = Colors.danger;
      iconName = 'alert-circle';
      label = 'HIGH RISK';
      break;
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Ionicons name={iconName as any} size={24} color={textColor} />
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  text: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
