import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuth } from 'lib/auth';
import { Button, Flex, Icon } from '@chakra-ui/react';
import { CgDesignmodo } from 'react-icons/cg';

const Home: NextPage = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      height="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Icon as={CgDesignmodo} w={10} h={10} color="teal.700" />

      <br />

      {auth.user ? (
        <Button as="a" href="/dashboard">
          View dashboard
        </Button>
      ) : (
        <Button onClick={() => auth.signInWithGithub()}>Sign in</Button>
      )}
    </Flex>
  );
};

export default Home;
