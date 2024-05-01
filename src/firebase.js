import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDt-sgL6Zp9W45_l3gL4E7FzoVygnu4n9c",
    authDomain: "itransition-task4-8ce0b.firebaseapp.com",
    projectId: "itransition-task4-8ce0b",
    storageBucket: "itransition-task4-8ce0b.appspot.com",
    messagingSenderId: "953478104783",
    appId: "1:953478104783:web:a8fbccdc94fbc0be42d9ba"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

export default app;