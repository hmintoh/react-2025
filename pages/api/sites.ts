import type { NextApiRequest, NextApiResponse } from 'next';
import { SiteRes } from 'utils/types';
import { getAllSites } from 'lib/db-admin';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SiteRes[] | unknown>
) => {
  const { error, results } = await getAllSites();

  error ? res.status(500).json({ error }) : res.status(200).json({ results });
};

export default handler;
