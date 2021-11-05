import { parseISO, format, compareDesc } from 'date-fns';
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
} from '@chakra-ui/react';
import { Site } from 'utils/types';

import { AddSiteModal } from 'composites/AddSiteModal';

interface SitesDashboardProps {
  data: Site[] | [];
}

const SitesDashboard = ({ data }: SitesDashboardProps) => {
  return data.length === 0 ? (
    <Box backgroundColor="white" padding={8} mt={8} textAlign="center">
      <Heading as="h2" size="md">
        You haven&apos;t added any sites.
      </Heading>
      <Text mt={2} mb={4}>
        Let&apos;s get started.
      </Text>

      <AddSiteModal ctaLabel={'Add your first site'} />
    </Box>
  ) : (
    <Box backgroundColor="white" padding={8} mt={8} textAlign="center">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Website</Th>
            <Th>Site URL</Th>
            <Th>Feedback URL</Th>
            <Th>Date Added</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .sort((a, b) =>
              compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
            )
            .map((d, i) => (
              <Tr key={i}>
                <Td>
                  <strong>{d.site}</strong>
                </Td>
                <Td>{d.url}</Td>
                <Td>
                  <Link>View feedback</Link>
                </Td>
                <Td>{format(parseISO(d.createdAt), 'PPpp')}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export { SitesDashboard };
