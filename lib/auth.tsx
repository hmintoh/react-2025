import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { firebase } from 'lib/firebase';
import { createUser } from 'lib/db';
import { User } from 'utils/types';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserWithToken extends User {
  token: string;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(firebase);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(formatUser(user));
      } else {
        setUser(null);
      }
    });
  }, []);

  const formatUser = (rawUser: any): UserWithToken => {
    return {
      uid: rawUser.uid,
      name: rawUser.displayName,
      email: rawUser.email,
      token: rawUser.accessToken,
      provider: rawUser.providerData[0].providerId,
      photoUrl: rawUser.photoURL,
    };
  };

  const signInWithGithub = (): void => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then((res) => {
      const user = formatUser(res.user);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);
    });
  };

  const signInWithGoogle = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((res) => {
      const user = formatUser(res.user);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);
    });
  };

  const signout = (): void => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{ signInWithGithub, signInWithGoogle, signout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
