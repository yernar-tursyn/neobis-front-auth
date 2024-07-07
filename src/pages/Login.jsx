import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import lorbyImage from '../assets/images/lorby-background.png';
import { EyeIcon } from '../assets/icons/EyeIcon';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(username.length > 0 && password.length > 0);
  }, [username, password]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (username === savedUsername && password === savedPassword) {
      alert('Успешный вход');
      navigate('/auth');
    } else {
      alert('Неправильный логин или пароль');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="lorby-background">
          <img src={lorbyImage} alt="Lorby background" />
        </div>
        <div className="auth-container">
          <div className="auth-create">
            <p>Вэлком бэк!</p>
          </div>
          <div className="form-container">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Введи туда-сюда логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль (тоже введи)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                  <EyeIcon />
                </span>
              </div>
              <button type="submit" className={isFormValid ? 'active' : ''} disabled={!isFormValid}>
                Войти
              </button>
              <p className='paragraph-register' onClick={handleRegisterClick}>У меня еще нет аккаунта</p>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Login;
