import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { posts } from '../../firebase/api'
import { AiFillHeart } from 'react-icons/ai'
import { useLiked } from '../../hooks/useInserDocument';

const Post = () => {
  const { dark } = useSelector((state) => state.mode)
  const { user } = useSelector((state) => state.userData)
  const { id } = useParams()
  const [postsData, setPostsData] = useState()

  useEffect(() => {
    if (posts) {
      const post = posts[id]
      setPostsData(post)
    }
  }, [posts])


  const liked = (likes) => {
    if (likes) {
      const userLiked = likes.filter(like => like == user.displayName)
      if (userLiked.length !== 0) return true
      return false
    }

  }

  const handleLike = async (e, index) => {
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
    <div className={!dark ? 'home dark' : 'home'}>
      <ul>
        {postsData && postsData ? (
          <li>
            <h3>{postsData.title}</h3>
            <img src={postsData.photo} alt={postsData.title} className='photo' />
            <div className='footerImg'>
              <span>Likes: {postsData.likes && postsData.likes.length}</span>
              <span
                onClick={(e) => handleLike(e, index)}
                className={
                  liked(postsData.likes) ? 'heart liked' : 'heart'
                }><AiFillHeart /></span>
              <br />
              <div id='footer-user'>
                <p>Criado por: {postsData.name}</p>
                {postsData.photoUser && <img src={postsData.photoUser} alt={postsData.name} />}
              </div>
            </div>
          </li>
        )
          :
          <h2>não existe posts ainda</h2>
        }
      </ul>
    </div >
  )
}

export default Post