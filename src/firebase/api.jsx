import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  getFirestore,
  getDocs
} from "firebase/firestore";

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)


const db = getFirestore(app);
export const ref = collection(db, 'posts');

export const posts = async () => {
  const docAsync = await getDocs(ref, orderBy("createdAt", "desc"))

  const posts = docAsync.docs.map(doc => doc.data());
  return posts
}

export default { db }