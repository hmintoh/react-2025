import type { NextApiRequest, NextApiResponse } from 'next';
import { SiteRes } from 'utils/types';
import { getSitesByUser } from 'lib/db-admin';

import { admin } from 'lib/firebase-admin';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SiteRes[] | unknown>
) => {
  const { uid } = await admin.auth().verifyIdToken(req.headers.token as string);
  const { error, results } = await getSitesByUser(uid);

  error ? res.status(500).json({ error }) : res.status(200).json({ results });
};

export default handler;
