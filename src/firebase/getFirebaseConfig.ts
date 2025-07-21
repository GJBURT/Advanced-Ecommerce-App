const getFirebaseConfig = () => {
    const isBrowser = typeof window !== 'undefined';

    return {
        apiKey: isBrowser ? import.meta.env.VITE_FIREBASE_API_KEY : process.env.VITE_FIREBASE_API_KEY!,
        authDomain: isBrowser ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : process.env.VITE_FIREBASE_AUTH_DOMAIN!,
        projectId: isBrowser ? import.meta.env.VITE_FIREBASE_PROJECT_ID : process.env.VITE_FIREBASE_PROJECT_ID!,
        storageBucket: isBrowser ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET : process.env.VITE_FIREBASE_STORAGE_BUCKET!,
        messagingSenderId: isBrowser ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID : process.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
        appId: isBrowser ? import.meta.env.VITE_FIREBASE_APP_ID : process.env.VITE_FIREBASE_APP_ID!,
    };
};

export default getFirebaseConfig;
