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

const db = await getFirestore(app);
export const ref = await collection(db, 'posts');
const documents = await getDocs(ref)
const posts = await documents.docs.map(doc => doc.data());

export { posts }
export default { db }