import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './CreatePost.css'
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { postCreate } from '../../hooks/useInserDocument';

const CreatePost = () => {
  const { user } = useSelector((state) => state.userData)
  const dark = useSelector((state) => state.mode.dark)

  const [title, setTitle] = useState()
  const [photo, setPhoto] = useState()
  const [error, setError] = useState()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const post = {
      likes: [],
      name: user.displayName,
      uid: user.uid,
      photoUser: user.photoURL,
      title,
      photo
    }

    if (!photo) {
      setError('Precisa ter uma foto com Url.')
      return
    }

    if (!title) {
      setError('A Foto precisa ter um título.')
      return
    }
    let url
    try {
      url = new URL(photo)
    } catch (error) {
      setError('A Foto precisa ser uma url.')
      return
    }
    postCreate(post)
  };

  return (
    <div className={!dark ? 'createPost dark' : 'createPost'}>
      <form onSubmit={handleSubmit} >
        <h1>Criar Post</h1>
        <label>Título do post:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <label>Url da foto do post:</label>
        <input type="text" onChange={(e) => setPhoto(e.target.value)} value={photo} />
        <input type="submit" value="Criar Post" className='btn' />
        {error && <p className='btn danger'>{error}</p>}
      </form>
    </div>
  )
}

export default CreatePost