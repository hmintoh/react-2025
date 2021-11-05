import { GetStaticPropsContext } from 'next';
import { getAllFeedback, getAllSites } from 'lib/db-admin';
import { Box, Divider } from '@chakra-ui/react';
import { FeedbackRes } from 'utils/types';

import { Feedback } from 'components/Feedback';

const SiteFeedback = ({ initialFeedback }: any) => {
  return (
    <Box pt={4} pb={4}>
      {initialFeedback.map((feedback: FeedbackRes, i: number) => (
        <>
          <Feedback key={i} {...feedback} />
          <Divider borderColor="gray.400" />
        </>
      ))}
    </Box>
  );
};

export default SiteFeedback;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const siteId = context.params!.siteId as string;
  const feedback = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
