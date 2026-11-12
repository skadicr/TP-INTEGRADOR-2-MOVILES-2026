// src/screens/InicioScreen.js
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';

export default function InicioScreen({ navigation }) {
  //* El usuario viene del contexto (useAuth)
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 TrackMyTrips</Text>
      <Text style={styles.subtitle}>{user.email}</Text>

      <CustomButton title="👤 Mi Perfil" color="#22C55E" onPress={() => navigation.navigate('Perfil')} style={styles.btn} />
      <CustomButton title="➕ Nuevo Viaje" color="#3B82F6" onPress={() => navigation.navigate('NuevoViaje')} style={styles.btn} />
      <CustomButton title="🧳 Mis Viajes" color="#8B5CF6" onPress={() => navigation.navigate('MisViajes')} style={styles.btn} />
      <CustomButton title="🗺️ Ver Mapa" color="#14B8A6" onPress={() => navigation.navigate('Mapa')} style={styles.btn} />
      <CustomButton title="🚪 Cerrar sesión" color="#EF4444" onPress={logoutUser} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F7FA', padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#0E7490', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#64748B', marginBottom: 18 },
  btn: { width: '80%', marginVertical: 4 },
});
