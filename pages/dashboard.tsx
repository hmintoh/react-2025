import type { NextPage } from 'next';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import { Flex, Text } from '@chakra-ui/react';

import { DashboardLayout } from 'components/DashboardLayout';
import { SitesDashboard } from 'composites/SitesDashboard';

const Dashboard = (): NextPage => {
  const { data } = useSWR('/api/sites', fetcher);

  return !data ? (
    <Flex direction="column" height="100vh" align="center" justify="center">
      <Text>Loading...</Text>
    </Flex>
  ) : (
    <DashboardLayout title="My Sites">
      <SitesDashboard data={data} />
    </DashboardLayout>
  );
};

export default Dashboard;
