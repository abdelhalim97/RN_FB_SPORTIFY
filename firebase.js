import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,onAuthStateChanged} from "firebase/auth";
import {getDatabase} from "firebase/database";
import env from "./env"

const firebaseConfig = initializeApp({
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID
  // apiKey: "AIzaSyAEQGhimQSqe754dAMZQPAqtshK2J-5Sqw",
  // authDomain: "terrain-12486.firebaseapp.com",
  // databaseURL: "https://terrain-12486-default-rtdb.firebaseio.com",
  // projectId: "terrain-12486",
  // storageBucket: "terrain-12486.appspot.com",
  // messagingSenderId: "832258486032",
  // appId: "1:832258486032:web:ef433d0dd073ce86513f95"
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