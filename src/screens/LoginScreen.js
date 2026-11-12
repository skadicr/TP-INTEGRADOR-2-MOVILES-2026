// src/screens/LoginScreen.js
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { loginUser } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    //* Validación: no permitir campos vacíos
    if (!email.trim() || !password) {
      Alert.alert('Campos vacíos', 'Ingresá tu email y tu contraseña.');
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      //* No navegamos a mano: AuthContext detecta al usuario y el navegador cambia solo.
    } catch (error) {
      Alert.alert('Error', 'Email o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 TrackMyTrips</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton title="Ingresar" color="#22C55E" onPress={handleLogin} loading={loading} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 16 }}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F1F5F9' },
  title: { fontSize: 30, fontWeight: '800', color: '#0E7490', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, marginVertical: 6 },
  link: { color: '#3B82F6', textAlign: 'center', fontWeight: '600' },
});
