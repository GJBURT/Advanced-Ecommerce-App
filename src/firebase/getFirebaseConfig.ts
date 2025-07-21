const getFirebaseConfig = () => {
    const isTestEnv = typeof process !== 'undefined' && process.env?.CI === 'true';

    return {
        apiKey: isTestEnv ? process.env.VITE_FIREBASE_API_KEY! : import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: isTestEnv ? process.env.VITE_FIREBASE_AUTH_DOMAIN! : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: isTestEnv ? process.env.VITE_FIREBASE_PROJECT_ID! : import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: isTestEnv ? process.env.VITE_FIREBASE_STORAGE_BUCKET! : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: isTestEnv ? process.env.VITE_FIREBASE_MESSAGING_SENDER_ID! : import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: isTestEnv ? process.env.VITE_FIREBASE_APP_ID! : import.meta.env.VITE_FIREBASE_APP_ID,
    };
};

export default getFirebaseConfig;
