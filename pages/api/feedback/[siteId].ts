import type { NextApiRequest, NextApiResponse } from 'next';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { firebase } from 'lib/firebase';
import { Feedback } from 'utils/types';

interface Data extends Feedback {
  id: string;
}

const db = getFirestore(firebase);

const getFeedback = async (
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) => {
  const siteId = req.query.siteId as string;
  const feedback: Data[] = [];

  const snapshot = await getDocs(
    query(collection(db, 'feedback'), where('siteId', '==', siteId))
  );

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() } as Data);
  });

  res.status(200).json(feedback);
};

export default getFeedback;
