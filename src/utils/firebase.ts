import firebase from "firebase";
import 'firebase/analytics';

// Firebase staging config
export const firebaseConfigStaging = {
    apiKey: "AIzaSyB61X7bwQtA0hoMM50bY0xquowotjhvDqM",
    authDomain: "nabi-music-chat-staging.firebaseapp.com",
    databaseURL: "https://nabi-music-chat-staging.firebaseio.com",
    projectId: "nabi-music-chat-staging",
    storageBucket: "nabi-music-chat-staging.appspot.com",
    messagingSenderId: "762494702316",
    appId: "1:762494702316:web:ca9ff61d8668dec2248bc9"
};

// Firebase prod config
export const firebaseConfigProd = {
    apiKey: "AIzaSyC6pVsVpKFQio1iN6F_ASknVwBhChefqYI",
    authDomain: "nabi-music-chat-prod.firebaseapp.com",
    databaseURL: "https://nabi-music-chat-prod.firebaseio.com",
    projectId: "nabi-music-chat-prod",
    storageBucket: "nabi-music-chat-prod.appspot.com",
    messagingSenderId: "386707647826",
    appId: "1:386707647826:web:2ca5ab385f0720ab5d5e8b",
    measurementId: "G-FS4Y5GLS3Q"
};

const fireBaseConfig = process.env.NODE_ENV === 'production' ? firebaseConfigProd : firebaseConfigStaging;

// Check that `window` is n scope for analytics module
if (typeof window !== undefined && !firebase.apps.length) {
    firebase.initializeApp(fireBaseConfig);

    // To enable analytics
    if ('measurementId' in  fireBaseConfig) firebase.analytics()
}

export default firebase;
