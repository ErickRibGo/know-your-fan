import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBxgsNROHqsCODEXOoBZ3XDJ3TzR9ZLAb4",
    authDomain: "knowyourfan-b776f.firebaseapp.com",
    databaseURL: "https://knowyourfan-b776f-default-rtdb.firebaseio.com",
    projectId: "knowyourfan-b776f",
    storageBucket: "knowyourfan-b776f.firebasestorage.app",
    messagingSenderId: "222700741719",
    appId: "1:222700741719:web:837bc523dbc0b3b2926f12"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
