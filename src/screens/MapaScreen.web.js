
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { getTrips } from '../services/tripService';

export default function MapaScreen() {
  const { user } = useAuth();

  const [viajes, setViajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar los viajes del usuario
  useEffect(() => {
    const cargarViajes = async () => {
      if (!user?.uid) {
        setCargando(false);
        return;
      }

      try {
        const resultado = await getTrips(user.uid);
        setViajes(resultado || []);
      } catch (error) {
        console.error('Error al cargar los viajes:', error);
        setViajes([]);
      } finally {
        setCargando(false);
      }
    };

    cargarViajes();
  }, [user?.uid]);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Cargando viajes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis viajes</Text>

      <Text style={styles.subtitle}>
        Historial de tus viajes registrados
      </Text>

      {viajes.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>
            No hay viajes para mostrar
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {viajes.map((viaje) => (
            <View key={viaje.id} style={styles.card}>
              <Text style={styles.tripTitle}>
                {viaje.descripcion || 'Viaje sin descripción'}
              </Text>

              <Text style={styles.detail}>
                Fecha: {viaje.fecha || 'Sin fecha'}
              </Text>

              {viaje.lat != null && viaje.lon != null && (
                <Text style={styles.detail}>
                  Ubicación: {viaje.lat}, {viaje.lon}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tripTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    color: '#64748b',
  },
  empty: {
    color: '#64748b',
    fontSize: 16,
  },
});
