import type { NextPage } from 'next';
import { useAuth } from 'lib/auth';
import { Flex, Text } from '@chakra-ui/react';

import { DashboardEmptyState } from 'composites/DashboardEmptyState';

const Dashboard = (): NextPage => {
  const auth = useAuth();

  return !auth.user ? (
    <Flex direction="column" height="100vh" align="center" justify="center">
      <Text>Loading...</Text>
    </Flex>
  ) : (
    <DashboardEmptyState />
  );
};

export default Dashboard;
