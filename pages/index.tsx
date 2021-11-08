import Head from 'next/head';
import { useAuth } from 'lib/auth';
import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaGithub, FaGoogle, FaKiwiBird } from 'react-icons/fa';

const Home = () => {
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

      <Icon as={FaKiwiBird} w={10} h={10} color="teal.700" />

      <br />

      {auth.user ? (
        <Button as="a" href="/dashboard">
          View dashboard
        </Button>
      ) : (
        <>
          <Button
            onClick={() => auth.signInWithGithub()}
            leftIcon={<Icon as={FaGithub} color="teal.700" />}
          >
            Sign in with Github
          </Button>

          <Button
            onClick={() => auth.signInWithGoogle()}
            leftIcon={<Icon as={FaGoogle} color="teal.700" />}
          >
            Sign in with Google
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Home;
