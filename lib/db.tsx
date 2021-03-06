import { firebase } from 'lib/firebase';
import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  collection,
} from 'firebase/firestore';
import { User, Site, Feedback } from 'utils/types';

const db = getFirestore(firebase);

const createUser = async (uid: string, data: User): Promise<void> => {
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
    await addDoc(docRef, data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const createFeedback = async (data: Feedback): Promise<void> => {
  try {
    const docRef = collection(db, 'feedback');
    await addDoc(docRef, data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export { createUser, createSite, createFeedback };
