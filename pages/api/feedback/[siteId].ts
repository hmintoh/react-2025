import type { NextApiRequest, NextApiResponse } from 'next';
import { FeedbackRes } from 'utils/types';
import { getAllFeedback } from 'lib/db-admin';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<FeedbackRes[] | unknown>
) => {
  const siteId = req.query.siteId as string;
  const { error, results } = await getAllFeedback(siteId);

  error ? res.status(500).json({ error }) : res.status(200).json({ results });
};

export default handler;
