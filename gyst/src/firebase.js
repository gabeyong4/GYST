import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCfvjCnjs7vmJraB0jxVujb2-hAwPJPzWI",
    authDomain: "gyst-7081b.firebaseapp.com",
    projectId: "gyst-7081b",
    storageBucket: "gyst-7081b.appspot.com",
    messagingSenderId: "345895043547",
    appId: "1:345895043547:web:a178bb95847171493be7fe"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth()

export default firebaseApp;

export {auth}
