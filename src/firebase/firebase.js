// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCR1wFk3ZUzBHeL28KTRVZgfEo6CpwLnJs",
    authDomain: "fb-crud-react-dd810.firebaseapp.com",
    projectId: "fb-crud-react-dd810",
    storageBucket: "fb-crud-react-dd810.appspot.com",
    messagingSenderId: "717844853595",
    appId: "1:717844853595:web:327e9f58b49178bb4e207e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);