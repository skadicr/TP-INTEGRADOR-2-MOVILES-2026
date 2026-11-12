// src/screens/PerfilScreen.js
//* Muestra y edita el perfil: nombre y edad (Firestore) y foto (URI local en AsyncStorage)
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { guardarFotoUri, leerFotoUri } from '../services/storageService';

export default function PerfilScreen() {
  const { user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [fotoUri, setFotoUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  //* Al abrir la pantalla: leer el perfil de Firestore y la foto guardada en el dispositivo
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const perfil = await getUserProfile(user.uid);
        if (perfil) {
          setNombre(perfil.nombre ?? '');
          setEdad(String(perfil.edad ?? ''));
        }
        setFotoUri(await leerFotoUri(user.uid));
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, []);

  //* Elegir una foto de la galería
  const elegirDeGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    //* Si el usuario cancela, no hay imagen
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  //* Sacar una foto con la cámara (primero se pide permiso)
  const sacarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso necesario', 'Necesitamos acceso a la cámara.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const guardar = async () => {
    if (nombre.trim().length < 3 || !edad.trim() || Number(edad) <= 0) {
      Alert.alert('Datos inválidos', 'Ingresá un nombre (mín. 3 letras) y una edad válida.');
      return;
    }
    setSaving(true);
    try {
      await updateUserProfile(user.uid, { nombre: nombre.trim(), edad: Number(edad) });
      await guardarFotoUri(user.uid, fotoUri);
      Alert.alert('Listo', 'Perfil actualizado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el perfil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {fotoUri ? (
        <Image source={{ uri: fotoUri }} style={styles.foto} />
      ) : (
        <View style={[styles.foto, styles.sinFoto]}>
          <Text style={{ color: '#64748B' }}>Sin foto</Text>
        </View>
      )}

      <View style={styles.row}>
        <CustomButton title="🖼️ Galería" color="#8B5CF6" onPress={elegirDeGaleria} style={{ flex: 1 }} />
        <CustomButton title="📸 Cámara" color="#14B8A6" onPress={sacarFoto} style={{ flex: 1 }} />
      </View>

      <Text style={styles.email}>{user.email}</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <CustomButton title="💾 Guardar" color="#22C55E" onPress={guardar} loading={saving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F1F5F9' },
  foto: { width: 140, height: 140, borderRadius: 70, alignSelf: 'center', marginBottom: 8 },
  sinFoto: { backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', gap: 8 },
  email: { textAlign: 'center', color: '#64748B', marginTop: 12 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, marginVertical: 6 },
});
