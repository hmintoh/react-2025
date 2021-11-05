import type { NextApiRequest, NextApiResponse } from 'next';
import { FeedbackRes } from 'utils/types';
import { getAllFeedback } from 'lib/db-admin';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<FeedbackRes[]>
) => {
  const siteId = req.query.siteId as string;
  const feedback = await getAllFeedback(siteId);

  res.status(200).json(feedback);
};

export default handler;
