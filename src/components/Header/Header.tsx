import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import "./Header.css"; 

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

   const handleLogin = () => {
     navigate("/login");
   };

  return (
    <header className="header">
      <h1>{t("title")}</h1>
      <div className="header-buttons">
        <select onChange={handleLanguageChange} defaultValue={i18n.language}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <button onClick={toggleTheme}>
          {theme === "light" ? t("darkMode") : t("lightMode")}
        </button>
        {!isAuthenticated ? (
          <button onClick={handleLogin}>{t("login")}</button>
        ) : (
          <button onClick={handleLogout}>{t("logout")}</button>
        )}
      </div>
    </header>
  );
};

export default Header;
