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

const getAllFeedback = async (siteId: string): Promise<FeedbackRes[]> => {
  const feedback: FeedbackRes[] = [];
  const snapshot = await getDocs(
    query(collection(db, 'feedback'), where('siteId', '==', siteId))
  );

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() } as FeedbackRes);
  });

  return feedback;
};

const getAllSites = async (): Promise<SiteRes[]> => {
  const sites: SiteRes[] = [];
  const snapshot = await getDocs(collection(db, 'sites'));

  snapshot.forEach((doc) =>
    sites.push({ id: doc.id, ...doc.data() } as SiteRes)
  );

  return sites;
};

export { getAllFeedback, getAllSites };
