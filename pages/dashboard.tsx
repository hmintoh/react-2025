import useSWR from "swr";
import { fetcher } from "utils/fetcher";
import { Flex, Text } from "@chakra-ui/react";
import { useAuth } from "lib/auth";

import { DashboardLayout } from "components/DashboardLayout";
import { SitesDashboard } from "composites/SitesDashboard";

const Dashboard = () => {
  const auth = useAuth();
  const { data } = useSWR(
    auth.user ? ["/api/sites", auth.user.token] : null,
    fetcher
  );

  return !data ? (
    <Flex direction="column" height="100vh" align="center" justify="center">
      <Text>Loading...</Text>
    </Flex>
  ) : (
    <DashboardLayout title="My Sites">
      <SitesDashboard data={data.results || []} />
    </DashboardLayout>
  );
};

export default Dashboard;
