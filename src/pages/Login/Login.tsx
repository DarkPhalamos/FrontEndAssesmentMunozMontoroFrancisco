import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUsersQuery } from "../../services/userApi"; 
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: users } = useGetUsersQuery();
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (users && users.length > 0) {
      setUserLoaded(true);
    }
  }, [users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userLoaded || !users) {
      setError("Unable to load users. Please try again.");
      return;
    }
    const normalizedUsername = username.trim().toLowerCase();

    const user = users.find(
      (u) => u.username.trim().toLowerCase() === normalizedUsername
    );

    if (user && password) {
      dispatch(login({ username: user.username, password, userId: user.id }));
      navigate("/");
    } else {
      setError(t("loginAlert"));
    }
  };

  return (
    <div className="login-container">
      <h2>{t("login")}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">{t("username")}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">{t("password")}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{t("login")}</button>
      </form>
      {error && <div className="error-message">{error}</div>}{" "}
    </div>
  );
};

export default Login;
