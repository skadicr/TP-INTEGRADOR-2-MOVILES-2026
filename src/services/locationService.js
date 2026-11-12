// src/services/locationService.js
import * as Location from 'expo-location';

//* Devuelve { lat, lon } con la ubicación actual. Si algo falla, lanza un Error.
export const obtenerUbicacionActual = async () => {
  //* 1. ¿Está activo el GPS / los servicios de ubicación?
  const enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) throw new Error('LOCATION_DISABLED');

  //* 2. ¿El usuario dio permiso?
  const permiso = await Location.requestForegroundPermissionsAsync();
  if (permiso.status !== 'granted') throw new Error('LOCATION_PERMISSION_DENIED');

  //* 3. Consulta puntual de la posición
  const resultado = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  return { lat: resultado.coords.latitude, lon: resultado.coords.longitude };
};

//* Región del mapa si no hay permiso (Obelisco, Buenos Aires)
export const REGION_POR_DEFECTO = {
  latitude: -34.6037,
  longitude: -58.3816,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};
