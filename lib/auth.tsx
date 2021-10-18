import React, { useState, useContext, createContext, ReactNode } from 'react';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { firebase } from 'lib/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const auth = getAuth(firebase);
  const provider = new GithubAuthProvider();

  const signInWithGithub = (): void => {
    signInWithPopup(auth, provider).then((res) => {
      setUser(res.user as any);
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
