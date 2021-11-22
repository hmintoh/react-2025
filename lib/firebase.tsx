import * as fb from 'firebase/app';

let firebase: fb.FirebaseApp;

if (!fb.getApps.length) {
  firebase = fb.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export { firebase };
