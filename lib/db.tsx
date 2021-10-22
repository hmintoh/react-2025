import { firebase } from 'lib/firebase';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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

export { createUser };
