import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAY3BoNnmcsLi84Gy9R3TfgHinyq1WEdhY",
    authDomain: "todo-list-98186.firebaseapp.com",
    projectId: "todo-list-98186",
    storageBucket: "todo-list-98186.appspot.com",
    messagingSenderId: "590840336794",
    apiId: "1:590840336794:web:0918eb22497e27d054aa23"
}


let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export default app;