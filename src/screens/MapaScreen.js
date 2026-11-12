// src/screens/MapaScreen.js
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../context/AuthContext';
import { getTrips } from '../services/tripService';
import { obtenerUbicacionActual, REGION_POR_DEFECTO } from '../services/locationService';

export default function MapaScreen() {
  const { user } = useAuth();
  const [region, setRegion] = useState(null);
  const [viajes, setViajes] = useState([]);

  //* Al montar: centrar el mapa en la ubicación actual; si falla, usar una región por defecto
  useEffect(() => {
    const cargarRegion = async () => {
      try {
        const ubicacion = await obtenerUbicacionActual();
        setRegion({ latitude: ubicacion.lat, longitude: ubicacion.lon, latitudeDelta: 0.05, longitudeDelta: 0.05 });
      } catch (error) {
        setRegion(REGION_POR_DEFECTO);
      }
    };
    cargarRegion();
  }, []);

  //* Los marcadores son los viajes del usuario. Se consultan al abrir la pantalla.
  useEffect(() => {
    const cargarViajes = async () => {
      try {
        setViajes(await getTrips(user.uid));
      } catch (error) {
        setViajes([]);
      }
    };
    cargarViajes();
  }, []);

  if (!region) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {viajes.map((v) => (
          <Marker
            key={v.id}
            coordinate={{ latitude: v.lat, longitude: v.lon }}
            title={v.descripcion}
            description={v.fecha}
          />
        ))}
      </MapView>
      {viajes.length === 0 && <Text style={styles.empty}>No hay viajes para mostrar</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  empty: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
