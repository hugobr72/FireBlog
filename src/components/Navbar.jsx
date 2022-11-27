import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { auth } from '.././firebase/api.jsx'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { MdOutlineExitToApp } from 'react-icons/md'


const Navbar = () => {
  const { userSlice } = useSelector((state) => state)
  const [toogleBurguer, setToogleBurguer] = useState(false)
  const logout = () => {
    signOut(auth)
  };


  const dispatch = useDispatch()
  const { dark } = useSelector((state) => state.mode)
  const { toogle } = useSelector((state) => state)
  const user = useSelector((state) => state.userData)
  return (
    <div className={!dark ? 'navbar dark' : 'navbar'}>
      <h1>FireBlog</h1>
      <div className='burguer'>
        <span className={!toogleBurguer ? 'span-burguer' : 'span-burguer active'} onClick={() => setToogleBurguer(!toogleBurguer)}></span>
        <ul id={!toogleBurguer ? 'list' : 'list-active'}>
          <li>
            <button onClick={() => dispatch(toogle)}>{!dark ? <BsFillSunFill /> : <BsFillMoonFill />}</button>
          </li>
          {user.user &&
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
          }
          {!user.user &&
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
          }
          {!user.user &&
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
          }
          {user.user &&
            <li>
              <NavLink to={`user/${user.user.uid}`} >Perfil</NavLink>
            </li>
          }

          {user.user &&
            <li>
              <NavLink to='/create-post'>Criar Post</NavLink>
            </li>
          }

          {user.user &&
            <li>
              <span onClick={logout}>{<MdOutlineExitToApp />}</span>
            </li>
          }

        </ul>
      </div>
    </div>
  )
}

export default Navbar