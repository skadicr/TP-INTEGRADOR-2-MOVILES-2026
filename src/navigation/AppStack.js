// src/navigation/AppStack.js  (pantallas privadas)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from '../screens/InicioScreen';
import PerfilScreen from '../screens/PerfilScreen';
import NuevoViajeScreen from '../screens/NuevoViajeScreen';
import MisViajesScreen from '../screens/MisViajesScreen';
import MapaScreen from '../screens/MapaScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'TrackMyTrips' }} />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Mi Perfil' }} />
      <Stack.Screen name="NuevoViaje" component={NuevoViajeScreen} options={{ title: 'Viaje' }} />
      <Stack.Screen name="MisViajes" component={MisViajesScreen} options={{ title: 'Mis Viajes' }} />
      <Stack.Screen name="Mapa" component={MapaScreen} options={{ title: 'Mapa de Viajes' }} />
    </Stack.Navigator>
  );
}
