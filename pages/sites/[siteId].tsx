import { GetStaticPropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAllFeedback, getAllSites } from 'lib/db-admin';
import { createFeedback } from 'lib/db';
import { useAuth } from 'lib/auth';
import { useForm } from 'react-hook-form';
import { parseISO, compareDesc } from 'date-fns';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  Button,
  Input,
  Divider,
} from '@chakra-ui/react';
import { Feedback, FeedbackRes } from 'utils/types';

import { FeedbackItem } from 'components/FeedbackItem';

interface DataProps {
  comment: string;
}

const SiteFeedback = ({ initialFeedback }: any) => {
  const { register, handleSubmit } = useForm();
  const auth = useAuth();
  const router = useRouter();

  const [feedback, setFeedback] = useState(initialFeedback);

  const onSubmit = async (data: DataProps) => {
    const newFeedback: Feedback = {
      rating: 5,
      status: 'pending',
      siteId: router.query.siteId as string,
      createdAt: new Date().toISOString(),
      authorId: auth.user.uid,
      author: auth.user.name,
      provider: auth.user.provider,
      text: data.comment,
    };
    setFeedback([...feedback, newFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Flex direction="column" height="100vh">
      <Flex direction="column" padding={4} justifyContent="space-between">
        <Heading as="h1">Leave feedback for this page</Heading>

        <Box as="form" onSubmit={handleSubmit(onSubmit)} pt={4} pb={4}>
          <FormControl mb={4} isRequired>
            <Input
              type="text"
              placeholder="I was very impressed with..."
              {...register('comment', { required: true })}
            />
          </FormControl>

          <Button colorScheme="teal" mr={3} type="submit">
            Leave feedback
          </Button>
        </Box>

        <Box pt={4} pb={4}>
          {feedback
            .sort((a: FeedbackRes, b: FeedbackRes) =>
              compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
            )
            .map((feedback: FeedbackRes, i: number) => (
              <span key={i}>
                <FeedbackItem {...feedback} />
                <Divider borderColor="gray.400" />
              </span>
            ))}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SiteFeedback;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const siteId = context.params!.siteId as string;
  const { results } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: results,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const { results } = await getAllSites();
  const paths = results!.map((site) => ({
    params: {
      siteId: site.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
