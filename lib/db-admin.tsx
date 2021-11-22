import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { firebase } from 'lib/firebase';
import { FeedbackRes, SiteRes } from 'utils/types';

const db = getFirestore(firebase);

const getAllFeedback = async (siteId: string) => {
  try {
    const results: FeedbackRes[] = [];
    const snapshot = await getDocs(
      query(collection(db, 'feedback'), where('siteId', '==', siteId))
    );

    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as FeedbackRes);
    });

    return { results };
  } catch (error) {
    return { error };
  }
};

const getAllSites = async () => {
  try {
    const results: SiteRes[] = [];
    const snapshot = await getDocs(collection(db, 'sites'));

    snapshot.forEach((doc) =>
      results.push({ id: doc.id, ...doc.data() } as SiteRes)
    );

    return { results };
  } catch (error) {
    return { error };
  }
};

const getSitesByUser = async (userId: string) => {
  try {
    const results: SiteRes[] = [];
    const snapshot = await getDocs(
      query(collection(db, 'sites'), where('authorId', '==', userId))
    );

    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as SiteRes);
    });

    return { results };
  } catch (error) {
    return { error };
  }
};

export { getAllFeedback, getAllSites, getSitesByUser };
