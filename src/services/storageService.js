// src/services/storageService.js
//* AsyncStorage: se usa para la URI LOCAL de la foto de perfil (una por usuario).
//* La foto vive en el dispositivo; en Firestore solo van los datos de texto.
import AsyncStorage from '@react-native-async-storage/async-storage';

const claveFoto = (uid) => `fotoPerfil_${uid}`;

export async function guardarFotoUri(uid, uri) {
  try {
    if (uri) await AsyncStorage.setItem(claveFoto(uid), uri);
    else await AsyncStorage.removeItem(claveFoto(uid));
  } catch (error) {
    console.error('Error guardando foto', error);
  }
}

export async function leerFotoUri(uid) {
  try {
    return await AsyncStorage.getItem(claveFoto(uid));
  } catch (error) {
    console.error('Error leyendo foto', error);
    return null;
  }
}
