import { getAuth, updatePassword, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Perfil.css'


const Perfil = () => {
  const user = useSelector((state) => state.userData)
  const dark = useSelector((state) => state.mode.dark)
  const { userData } = useSelector((state) => state)
  const auth = getAuth()
  const { uid } = useParams()

  const [photoUrl, setPhotoUrl] = useState()
  const [password, setPassword] = useState('')
  const [name, setName] = useState()
  const [email, setEmail] = useState()

  const authUser = auth.currentUser

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password) {
      if (photoUrl) {
        await updatePassword(authUser, password)
        await updateProfile(authUser, { photoURL: photoUrl })
        return
      }
      await updatePassword(authUser, password)
      return
    }
    await updateProfile(authUser, { photoURL: photoUrl })
    return
  }

  useEffect(() => {
    if (user) {
      setPhotoUrl(user.user.photoURL)
      setName(user.user.displayName)
      setEmail(user.user.email)
    }
  }, [user])

  return (
    <div className={!dark ? 'perfil dark' : 'perfil'}>
      {user.user.uid == uid && <form onSubmit={handleSubmit}>
        <h1>Perfil de {name || ''}</h1>
        {photoUrl && <img src={photoUrl} alt={name || ''} />}
        <input
          type="text"
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder='Adicionar Url Da Foto.'
          value={photoUrl || ''}
        />
        <input type="text" placeholder='Email.' defaultValue={email || ''} disabled />
        <input type="text" placeholder='Nome.' defaultValue={name || ''} disabled />
        <input type="text" placeholder='Trocar Senha.' onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" className='btn' value='Mudar' />
      </form>}
      {user.user.uid !== uid && (<h1>Ola mundo</h1>)}

    </div>
  )
}

export default Perfil
