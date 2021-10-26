import { NextPage } from 'next';
import { Text, Heading, Box } from '@chakra-ui/react';

import { DashboardLayout } from 'components/DashboardLayout';
import { AddSiteModal } from 'composites/AddSiteModal';

const DashboardEmptyState = (): NextPage => {
  return (
    <DashboardLayout title="My Sites">
      <Box backgroundColor="white" padding={4} mt={8} textAlign="center">
        <Heading as="h2" size="md">
          You haven&apos;t added any sites.
        </Heading>
        <Text mt={2} mb={4}>
          Welcome 👋 Let&apos;s get started.
        </Text>

        <AddSiteModal />
      </Box>
    </DashboardLayout>
  );
};

export { DashboardEmptyState };
