import type { NextApiRequest, NextApiResponse } from 'next';
import { SiteRes } from 'utils/types';
import { getAllSites } from 'lib/db-admin';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SiteRes[]>
) => {
  const sites: SiteRes[] = await getAllSites();

  res.status(200).json(sites);
};

export default handler;
