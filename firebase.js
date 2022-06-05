import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,onAuthStateChanged} from "firebase/auth";
import {getDatabase} from "firebase/database";

const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});
export const auth = getAuth(firebaseConfig);
export const db = getDatabase(firebaseConfig)
onAuthStateChanged(auth,user=>{
  if(user!==null){
console.log('connected')
  }
  else{
    console.log('u r not logged in')
  }
})