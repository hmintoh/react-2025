import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebase } from 'lib/firebase';

type Data = {
  name: string;
};

const db = getFirestore(firebase);

const getSites = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const snapshot = await getDocs(collection(db, 'sites'));
  const sites = [];

  snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

  res.status(200).json(sites);
};

export default getSites;
