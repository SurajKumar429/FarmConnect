import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }
  return (
    <header className="header">
      <h1>🌾 FarmConnect</h1>
      <nav className="header-nav">
        <Link to="/dashboard">{t('common.dashboard')}</Link>
        <Link to="/farms">{t('common.myFarms')}</Link>
        <Link to="/marketplace">{t('common.marketplace')}</Link>
        <Link to="/market-prices">{t('common.marketPrices')}</Link>
        <Link to="/resources">{t('common.resources')}</Link>
        <Link to="/learning">{t('common.learning')}</Link>
        <div className="header-user">
          <LanguageSwitcher />
          <span>{t('common.welcome')}, {user?.name}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            {t('common.logout')}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

