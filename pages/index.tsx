import type { NextPage } from 'next';
import Head from 'next/head';
import styles from 'styles/Home.module.css';

import { useAuth } from 'lib/auth';

const Home: NextPage = () => {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
        <meta name="description" content="Fast feedback sandbox app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Fast Feedback</h1>
      </main>
      <div>
        <button onClick={() => auth.signInWithGithub()}>sign in</button>
        <button onClick={() => auth.signout()}>sign out</button>
        <p>{auth.user && auth.user.name}</p>
        <p>{auth.user && auth.user.email}</p>
      </div>

      <footer className={styles.footer}>footer</footer>
    </div>
  );
};

export default Home;
