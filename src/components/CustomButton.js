// src/components/CustomButton.js  (botón reutilizable)
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CustomButton({ title, onPress, color = '#3B82F6', loading = false, style }) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: loading ? '#9CA3AF' : color }, style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { padding: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
