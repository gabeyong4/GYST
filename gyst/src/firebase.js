import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAPIGhfMjrACtwRI2s8SMEn9Fqb7Nabjyk",
    authDomain: "democpp-61a4d.firebaseapp.com",
    projectId: "democpp-61a4d",
    storageBucket: "democpp-61a4d.appspot.com",
    messagingSenderId: "1006777359079",
    appId: "1:1006777359079:web:e244e26647013942d6a042"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;