import React, { useState } from 'react'
import './index.css';
import { auth } from '../firebase/api';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword, updateProfile
} from 'firebase/auth';

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  const handleSubmit = async (e) => {
    const displayName = name
    e.preventDefault();
    const { user } = await createUserWithEmailAndPassword(email, password)
    await updateProfile(user, { displayName })
    console.log(user);
  }

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Name...' /><br />
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email...' /><br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Senha..' /><br />
        {!loading && <input className='btn' type="submit" value="Cadastrar" />}
        {loading && <input className='btn loading' type="submit" disabled value="Carregando..." />}
        {error && <p className='btn danger'>Ocorreu um erro inesperado!!</p>}
      </form>
    </div>
  )
}

export default Register