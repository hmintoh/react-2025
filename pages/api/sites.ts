import type { NextApiResponse } from 'next';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebase } from 'lib/firebase';
import { Site } from 'utils/types';

interface Data extends Site {
  id: string;
}

const db = getFirestore(firebase);

const getSites = async (res: NextApiResponse<Data[]>) => {
  const snapshot = await getDocs(collection(db, 'sites'));
  const sites: Data[] = [];

  snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() } as Data));

  res.status(200).json(sites);
};

export default getSites;
