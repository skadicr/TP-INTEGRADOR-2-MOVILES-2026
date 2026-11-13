// src/services/tripService.js
//* CRUD de la entidad principal: colección "viajes" en Firestore
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

//* CREATE
export const createTrip = async (trip) => {
  const reference = await addDoc(collection(db, 'viajes'), trip);
  return reference.id;
};

//* READ: solo los viajes del usuario (query con where por userId)
export const getTrips = async (userId) => {
  const tripsQuery = query(collection(db, 'viajes'), where('userId', '==', userId));
  const snapshot = await getDocs(tripsQuery);
  const trips = snapshot.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
  // return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  return trips.sort((a, b) => String(a.fecha).localeCompare(String(b.fecha))); // ordenar por fecha
};

//* UPDATE
export const updateTrip = async (tripId, data) => {
  await updateDoc(doc(db, 'viajes', tripId), data);
};

//* DELETE
export const deleteTrip = async (tripId) => {
  await deleteDoc(doc(db, 'viajes', tripId));
};
