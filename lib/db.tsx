import { firebase } from 'lib/firebase';
import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  collection,
} from 'firebase/firestore';
import { Site } from 'utils/types';

const db = getFirestore(firebase);

const createUser = async (uid, data): Promise<void> => {
  try {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, data, { merge: true });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const createSite = async (data: Site): Promise<void> => {
  try {
    const docRef = collection(db, 'sites');
    await addDoc(docRef, data, { merge: true });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export { createUser, createSite };
