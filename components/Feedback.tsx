import { parseISO, format } from 'date-fns';
import { FeedbackRes } from 'utils/types';
import { Box, Heading, Text } from '@chakra-ui/react';

const Feedback = ({ author, createdAt, text }: FeedbackRes) => {
  return (
    <Box mb={4}>
      <Heading as="h4" size="md" color="gray.800">
        {author}
      </Heading>
      <Text fontSize="xs" color="gray.600" mb={2}>
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text fontSize="md" color="gray.800">
        {text}
      </Text>
    </Box>
  );
};

export { Feedback };
