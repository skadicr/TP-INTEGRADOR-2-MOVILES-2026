// src/screens/RegisterScreen.js
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { registerUser } from '../services/authService';
import { createUserProfile } from '../services/userService';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    //* Validaciones mínimas
    if (nombre.trim().length < 3 || !email.trim()) {
      Alert.alert('Datos inválidos', 'Ingresá un nombre (mín. 3 letras) y un email.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Datos inválidos', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      //* 1. Crear la cuenta en Firebase Authentication
      const credential = await registerUser(email, password);
      //* 2. Guardar el perfil en Firestore: usuarios/{uid}
      await createUserProfile(credential.user.uid, { nombre: nombre.trim(), email: email.trim(), edad: '' });
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar. Revisá los datos (puede que el email ya exista).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
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
        placeholder="Contraseña (mín. 6 caracteres)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton title="Registrarme" color="#22C55E" onPress={handleRegister} loading={loading} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
        <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F1F5F9' },
  title: { fontSize: 26, fontWeight: '800', color: '#0E7490', textAlign: 'center', marginBottom: 16 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, marginVertical: 6 },
  link: { color: '#3B82F6', textAlign: 'center', fontWeight: '600' },
});
