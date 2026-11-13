
//* Perfil del usuario: documento usuarios/{uid} en Firestore
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const createUserProfile = async (uid, data) => {
  await setDoc(doc(db, 'usuarios', uid), data);
};

export const getUserProfile = async (uid) => {
  const snapshot = await getDoc(doc(db, 'usuarios', uid));
  return snapshot.exists() ? snapshot.data() : null;
};

//* Actualiza solo los campos indicados, sin reemplazar el resto del perfil
export const updateUserProfile = async (uid, data) => {
  // await updateDoc(doc(db, 'usuarios', uid), data);
  await setDoc(doc(db, 'usuarios', uid), data, { merge: true }); // merge: true para no reemplazar el resto del documento
};
