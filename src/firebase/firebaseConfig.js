import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAt6SWG2A5el263_ZiAf74LoENURMjEcVM",
  authDomain: "fir-storage-app-170326.firebaseapp.com",
  projectId: "fir-storage-app-170326",
  storageBucket: "fir-storage-app-170326.firebasestorage.app",
  messagingSenderId: "46871576371",
  appId: "1:46871576371:web:e0ed0849bb8621ac100846",
  measurementId: "G-D3Z04S1JK5",
  databaseURL: "https://fir-storage-app-170326-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)