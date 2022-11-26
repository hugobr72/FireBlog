import React from 'react'
import { useSelector } from 'react-redux'
import './Footer.css'

const Footer = () => {
  const { dark } = useSelector((state) => state.mode)
  return (
    <div className={!dark ? 'footer dark' : 'footer'}>
    <h3>Copyright ©2022</h3>
    </div>
  )
}

export default Footer