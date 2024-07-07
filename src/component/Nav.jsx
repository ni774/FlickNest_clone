import React, { useState, useEffect } from 'react';
import "../style/Nav.css";

function Nav() {
  const [show, handleshow] = useState(false)


  const handleScroll = () => {
    if (window.scrollY > 100) {
      handleshow(true);
    } else {
      handleshow(false);
    }
  };



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={`nav ${show && "nav_white"}`}>
      <img
        className="nav_logo"
        src="FlickNest.png"
        alt="Netflix Logo"
      />
  
      {show && <span>Just Play and Enjoy The FlickNest</span>}

      {/***navigation 3 line  on right side */ }
      <img
        className="nav_avatar"
        src="https://img.icons8.com/?size=100&id=3096&format=png&color=#0000"  
        alt="Netflix Logo"
        onClick={()=>{
          window.scrollTo({
            top: 0,
            left: 0,
            behavior:'smooth'
          })
        }}
      />
    </div>
  )
}

export default Nav
