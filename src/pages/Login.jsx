import React, { useState } from 'react'
import './index.css';
import { auth } from '../firebase/api';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import {
  signInWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMsg, setErrorMsg] = useState()

  const userData = useSelector((state) => state.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error
  ] = useSignInWithEmailAndPassword(auth)

  const handleSubmit = async (e) => {
    setErrorMsg()
    e.preventDefault();
    await signInWithEmailAndPassword(email, password)
    await user
    if (!user) {
      const er =  String(error.message)
      errors(er)
      return
    }
    navigate('/')
  }

  const errors = (msg) => {
    if (msg.includes('password')) {
      setErrorMsg('Senha incorreta!')
      return
    }
    if (msg.includes('user-not-found')) {
      setErrorMsg('Email incorreto!')
      return
    }
    setErrorMsg('Ocorreu um erro inesperado!')
    return
  }

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email...' /><br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Senha..' /><br />
        {!loading && <input className='btn' type="submit" value="Login" />}
        {loading && <input className='btn loading' type="submit" disabled value="Carregando..." />}
        {errorMsg && <p className='btn danger'>{errorMsg}</p>}
        <p>Não tem conta?? <Link to='/register'>Clique para se Registrar..</Link></p>
      </form>
      
    </div>
  )
}

export default Login