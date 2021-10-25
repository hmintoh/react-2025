import type { NextPage } from 'next';
import { useAuth } from 'lib/auth';
import Head from 'next/head';

import { Button, Text, Heading, Container } from '@chakra-ui/react';
import styles from 'styles/Home.module.css';

const Home: NextPage = () => {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <main className={styles.main}>
        <Heading as="h1" size="4xl">
          Welcome to Fast Feedback{' '}
        </Heading>

        <Container>
          <Button onClick={() => auth.signInWithGithub()}>sign in</Button>

          {auth.user && (
            <>
              <Text fontSize="xl">{auth.user.name}</Text>
              <Text fontSize="xl">{auth.user.email}</Text>
              <Button onClick={() => auth.signout()}>sign out</Button>
            </>
          )}
        </Container>
      </main>

      <footer className={styles.footer}>footer</footer>
    </div>
  );
};

export default Home;
