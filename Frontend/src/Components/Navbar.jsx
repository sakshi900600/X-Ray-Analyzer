import React, { useState } from 'react'
import "./Navbar.css"
import { DiGoogleAnalytics } from "react-icons/di";
import { RiMenu3Fill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)

  // menu toggle fun
  const toggleMenu = ()=>{
    setIsOpen(!isOpen); // if open then close else open.
  }



  return (
    <>
        <header>
            <div className='nav-logo'>
                <DiGoogleAnalytics className='logo' />
                <span>Scanomaly</span>
            </div>

            <RiMenu3Fill className='menu' onClick={toggleMenu}/>

            <nav className={`nav-links ${isOpen? 'active': ""}`}>
            <IoCloseSharp  className='close-btn' onClick={toggleMenu}/>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </nav>
        </header>
      
    </>
  )
}

export default Navbar


