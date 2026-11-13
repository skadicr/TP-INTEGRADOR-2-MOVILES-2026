// src/components/TripCard.js  (tarjeta reutilizable de un viaje)
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatearFecha } from '../utils/fecha';

export default function TripCard({ viaje, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.desc}>{viaje.descripcion}</Text>
      <Text style={styles.coords}> {viaje.lat.toFixed(5)}, {viaje.lon.toFixed(5)}</Text>
      <Text style={styles.fecha}> {formatearFecha(viaje.fecha)}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.action, { backgroundColor: '#FB923C' }]} onPress={() => onEdit(viaje)}>
          <Text style={styles.actionText}> Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.action, { backgroundColor: '#EF4444' }]} onPress={() => onDelete(viaje)}>
          <Text style={styles.actionText}> Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginVertical: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  desc: { fontWeight: '700', color: '#0F172A', marginBottom: 4, fontSize: 16 },
  coords: { color: '#475569' },
  fecha: { color: '#94A3B8', fontSize: 12, marginTop: 6 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 10 },
  action: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center' },
  actionText: { color: '#fff', fontWeight: 'bold' },
});
