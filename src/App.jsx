import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import api, { auth } from './firebase/api';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { login } from './slices/userSlice';
import Perfil from './pages/Perfil/Perfil';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userData)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user))
    });
  }, [auth]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={!user.user ? <Register /> : <Navigate to='/' />} />
          <Route path='/login' element={!user.user ? <Login /> : <Navigate to='/' />} />
          <Route path='/user/:uid' element={user.user && <Perfil />} />
          <Route path='/create-post' element={user.user && <CreatePost />} />
          <Route path='/post/:id' element={<Post />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}



export default App
