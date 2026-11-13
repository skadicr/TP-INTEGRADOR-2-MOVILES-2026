export const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  return Number.isNaN(date.getTime()) ? String(fecha) : date.toLocaleString();
};
