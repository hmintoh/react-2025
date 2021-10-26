import type { NextPage } from 'next';
import { useAuth } from 'lib/auth';
import Head from 'next/head';

import { Button, Flex } from '@chakra-ui/react';

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

      {auth.user ? (
        <Button onClick={() => auth.signout()}>Sign out</Button>
      ) : (
        <Button onClick={() => auth.signInWithGithub()}>Sign in</Button>
      )}
    </Flex>
  );
};

export default Home;
