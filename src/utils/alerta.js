import { Alert, Platform } from 'react-native';

export const mostrarAlerta = (titulo, mensaje) => {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n${mensaje}`);
    return;
  }
  Alert.alert(titulo, mensaje);
};

export const confirmarAccion = (titulo, mensaje, textoConfirmar, onConfirmar) => {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titulo}\n${mensaje}`)) onConfirmar();
    return;
  }
  Alert.alert(titulo, mensaje, [
    { text: 'Cancelar', style: 'cancel' },
    { text: textoConfirmar, style: 'destructive', onPress: onConfirmar },
  ]);
};
