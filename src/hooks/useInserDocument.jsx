import { doc, getDocs, updateDoc, getFirestore, collection, addDoc } from 'firebase/firestore'
import { posts, ref } from '../firebase/api'

const db = getFirestore()
export const useLiked = async (index, array) => {
  let dataPost = await posts()
  dataPost = dataPost[index]
  dataPost.likes = array
  let idDoc = await getDocs(ref)
  idDoc = String(idDoc.docs[index].id)
  const docRef = doc(db, 'posts', idDoc)
  await updateDoc(docRef, dataPost)
    .then((doc) => console.log('deu certo'))
    .catch((err) => posts)
  const documents = await getDocs(ref)
  const newPosts = await documents.docs.map(doc => doc.data());
  return newPosts
}

export const postCreate = async (data) => {
  const dbRef = await collection(db, 'posts')
  await addDoc(dbRef, data)
    .then(docRef => {
    })
    .catch(error => {

      console.log(error);
    })
}