// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import LanguageSwitcher from './LanguageSwitcher'

// const Navbar = () => {
//     const navigate = useNavigate()

//     const handleClickLogin = ()=>{
//         navigate("/login")
//     }
//   return (
//     <div className='navbar'>
//         <div className='logo'>
//            <h1>🌾 FarmConnect</h1>
//         </div>
        
//         <div className='points'>
//             <a href="#home" className='list'>Home</a>
//             <a href="#Gallery" className='list'>Gallery</a>
//             <a href='#about' className='list'>About Us</a>
//             <a href='#footer' className='list'>Contact Us</a>
//         </div>

//         <div className='login' style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//             <LanguageSwitcher />
//             <button className='lgbtn' onClick={handleClickLogin}>Login</button>
//         </div>
        
//     </div>
//   )
// }

// export default Navbar




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { FaBars, FaTimes } from 'react-icons/fa';
// import './Navbar.css'; // ensure you import your CSS

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClickLogin = () => {
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Left side: logo */}
      <div className="logo">
        <h1>🌾 FarmConnect</h1>
      </div>

      {/* Menu icon for small screens */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Middle links */}
      <div className={`points ${menuOpen ? 'active' : ''}`}>
        <a href="#home" className="list" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#Gallery" className="list" onClick={() => setMenuOpen(false)}>Gallery</a>
        <a href="#about" className="list" onClick={() => setMenuOpen(false)}>About Us</a>
        <a href="#footer" className="list" onClick={() => setMenuOpen(false)}>Contact Us</a>

        {/* Right side login + language */}
      <div className="login" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <LanguageSwitcher />
        <button className="lgbtn" onClick={handleClickLogin}>Login</button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
