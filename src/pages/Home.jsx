import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { posts } from '../firebase/api';
import './index.css'
import { AiFillHeart } from 'react-icons/ai'
import { useLiked } from '../hooks/useInserDocument';
import { Link } from 'react-router-dom';

const Home = () => {
  const { dark } = useSelector((state) => state.mode)
  const { user } = useSelector((state) => state.userData)
  const [postsData, setPostsData] = useState()

  useEffect(() => {
    const fethPosts = async () => {
      if (posts) {
        const docPosts = await posts()
        setPostsData(docPosts)
      }
    }
    fethPosts()
  }, [posts])


  const liked = (likes) => {
    if (likes) {
      const userLiked = likes.filter(like => like == user.displayName)
      if (userLiked.length !== 0) return true
      return false
    }

  }

  const handleLike = async (e, index) => {
    if(!user.displayName) return
    let likes = posts[index].likes
    if (e.target.parentNode.parentNode.className === 'heart liked') {
      likes = likes.filter(name => name !== user.displayName)
      const newData = await useLiked(index, likes)
      setPostsData(newData)
      return
    }
    likes.push(user.displayName)
    const newData = await useLiked(index, likes)
    setPostsData(newData)
    return
  }

  return (
    <div className={!dark ? 'home dark' : 'home'} >
      <ul>
        {postsData &&
          postsData.length > 0 ? (
          postsData.map((post, index) => (
            <li key={index}>
              <h3>{post.title}</h3>
              <img src={post.photo} alt={post.title} className='photo' />
              <div className='footerImg'>
                <span>Likes: {post.likes && post.likes.length}</span>
                <span
                  onClick={(e) => handleLike(e, index)}
                  className={
                    liked(post.likes) ? 'heart liked' : 'heart'
                  }><AiFillHeart /></span>
                <br />
                <div id='footer-user'>
                  <p>Criado por: {post.name}</p>
                  {post.photoUser && <img src={post.photoUser} alt={post.name} />}
                </div>
              </div>
              <Link to={`post/${index}`}>
                <p>Clique para ver o post!</p>
              </Link>
            </li>
          ))
        )
          :
          <h2>não existe posts ainda</h2>
        }
      </ul>
    </div>
  )
}

export default Home