// src/screens/NuevoViajeScreen.js
//* Sirve para CREAR un viaje y también para EDITAR uno (si llega route.params.viaje)
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { createTrip, updateTrip } from '../services/tripService';
import { obtenerUbicacionActual } from '../services/locationService';

export default function NuevoViajeScreen({ navigation, route }) {
  const { user } = useAuth();
  const viajeEditado = route.params?.viaje;

  const [descripcion, setDescripcion] = useState(viajeEditado ? viajeEditado.descripcion : '');
  const [pos, setPos] = useState(viajeEditado ? { lat: viajeEditado.lat, lon: viajeEditado.lon } : null);
  const [saving, setSaving] = useState(false);

  const obtenerUbicacion = async () => {
    try {
      setPos(await obtenerUbicacionActual());
    } catch (error) {
      Alert.alert('Ubicación', 'No se pudo obtener la ubicación. Revisá el permiso y que el GPS esté activo.');
    }
  };

  const guardarViaje = async () => {
    //* Validaciones: descripción de al menos 3 letras y ubicación obtenida
    if (descripcion.trim().length < 3 || !pos) {
      Alert.alert('Faltan datos', 'Ingresá una descripción (mín. 3 letras) y obtené la ubicación.');
      return;
    }
    setSaving(true);
    try {
      if (viajeEditado) {
        //* UPDATE
        await updateTrip(viajeEditado.id, { descripcion: descripcion.trim(), lat: pos.lat, lon: pos.lon });
      } else {
        //* CREATE: se guarda el userId del usuario autenticado
        await createTrip({
          userId: user.uid,
          descripcion: descripcion.trim(),
          lat: pos.lat,
          lon: pos.lon,
          fecha: new Date().toLocaleString(),
        });
      }
      navigation.navigate('Inicio');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el viaje.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{viajeEditado ? 'Editar Viaje' : 'Nuevo Viaje'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción del lugar o nota..."
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <CustomButton title="Obtener ubicación" color="#3B82F6" onPress={obtenerUbicacion} />

      {pos && <Text style={styles.coords}>Lat: {pos.lat.toFixed(5)} | Lon: {pos.lon.toFixed(5)}</Text>}

      <CustomButton title="Guardar" color="#22C55E" onPress={guardarViaje} loading={saving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  title: { fontSize: 22, fontWeight: '800', color: '#0EA5E9', textAlign: 'center', marginBottom: 16 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, marginBottom: 10 },
  coords: { textAlign: 'center', marginTop: 8, color: '#475569' },
});
