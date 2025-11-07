import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)
  return (
    <header className="header">
      <div className='header-content'>
      <h1 className='logo'>🌾 FarmConnect</h1>

      <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <nav className={`header-nav ${menuOpen ? 'active':''}`}>
        <Link to="/dashboard" onClick={toggleMenu}>{t('common.dashboard')}</Link>
        <Link to="/farms" onClick={toggleMenu}>{t('common.myFarms')}</Link>
        <Link to="/marketplace" onClick={toggleMenu}>{t('common.marketplace')}</Link>
        <Link to="/market-prices" onClick={toggleMenu}>{t('common.marketPrices')}</Link>
        <Link to="/resources" onClick={toggleMenu}>{t('common.resources')}</Link>
        <Link to="/learning" onClick={toggleMenu}>{t('common.learning')}</Link>
        <div className="header-user">
          <LanguageSwitcher onClick={toggleMenu}/>
          <span>{t('common.welcome')}, {user?.name}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            {t('common.logout')}
          </button>
        </div>
      </nav>
    </div>
    </header>
  );
};

export default Header;

