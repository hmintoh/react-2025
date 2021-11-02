import { ReactNode } from 'react';
import type { NextPage } from 'next';
import { useAuth } from 'lib/auth';
import {
  Heading,
  Flex,
  Icon,
  Link,
  Stack,
  Avatar,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from '@chakra-ui/react';
import { CgDesignmodo } from 'react-icons/cg';

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
}

const DashboardLayout = ({
  title,
  children,
}: DashboardLayoutProps): NextPage => {
  const auth = useAuth();

  return (
    <Flex direction="column" height="100vh">
      <Flex direction="row" padding={4} justifyContent="space-between">
        <Stack isInline spacing={4} alignItems="center">
          <Icon as={CgDesignmodo} w={10} h={10} color="teal.700" />
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        {auth.user && (
          <Flex alignItems="center">
            <Button
              as="a"
              href="/"
              variant="link"
              onClick={() => auth.signout()}
              mr={4}
            >
              Logout
            </Button>
            <Avatar size="sm" name={auth.user.name} src={auth.user.photoUrl} />
          </Flex>
        )}
      </Flex>

      <Flex direction="column" backgroundColor="gray.50" padding={4}>
        <Box maxWidth="container.xl" width="100%" margin="auto">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading as="h1" size="2xl">
            {title}
          </Heading>

          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export { DashboardLayout };
