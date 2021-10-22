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
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { firebase } from 'lib/firebase';
import { createUser } from 'lib/db';

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  uid: string;
  name: string;
  email: string;
  provider: string;
  photoUrl: string;
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(firebase);
  const provider = new GithubAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(formatUser(user));
      } else {
        setUser(null);
      }
    });
  }, []);

  const formatUser = (rawUser: any): User => {
    return {
      uid: rawUser.uid,
      name: rawUser.displayName,
      email: rawUser.email,
      provider: rawUser.providerData[0].providerId,
      photoUrl: rawUser.photoURL,
    };
  };

  const signInWithGithub = (): void => {
    signInWithPopup(auth, provider).then((res) => {
      const user = formatUser(res.user);
      createUser(user.uid, user);
      setUser(user);
    });
  };

  const signout = (): void => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ signInWithGithub, signout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
