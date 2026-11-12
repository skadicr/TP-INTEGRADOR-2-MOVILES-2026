// src/screens/MisViajesScreen.js
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import TripCard from '../components/TripCard';
import { useAuth } from '../context/AuthContext';
import { deleteTrip, getTrips } from '../services/tripService';

export default function MisViajesScreen({ navigation }) {
  const { user } = useAuth();
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);

  //* READ: trae los viajes del usuario autenticado
  const cargarViajes = async () => {
    try {
      setViajes(await getTrips(user.uid));
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los viajes.');
    } finally {
      setLoading(false);
    }
  };

  //* Al abrir la pantalla se consultan los viajes del usuario
  useEffect(() => {
    cargarViajes();
  }, []);

  //* UPDATE: abre el formulario con el viaje elegido
  const editar = (viaje) => navigation.navigate('NuevoViaje', { viaje });

  //* DELETE: pide confirmación, elimina y vuelve a consultar
  const eliminar = (viaje) => {
    Alert.alert('Confirmar', '¿Eliminar este viaje?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTrip(viaje.id);
            cargarViajes();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el viaje.');
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {viajes.length === 0 ? (
        <Text style={styles.empty}>No hay registros aún.</Text>
      ) : (
        <FlatList
          data={viajes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TripCard viaje={item} onEdit={editar} onDelete={eliminar} />}
        />
      )}

      <CustomButton title="➕ Nuevo Viaje" color="#22C55E" onPress={() => navigation.navigate('NuevoViaje')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F1F5F9' },
  empty: { textAlign: 'center', color: '#64748B', flex: 1, marginTop: 20 },
});
