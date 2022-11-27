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
const documents = await getDocs(ref).then(doc => doc).catch(err => err)

const posts = documents.docs.map(doc => doc.data());

export { posts }
export default { db }