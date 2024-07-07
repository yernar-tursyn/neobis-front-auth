import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from './assets/icons/ArrowLeft.jsx';
import { EyeIcon } from './assets/icons/EyeIcon.jsx';
import lorbyImage from './assets/images/lorby-background.png';
import { useState, useEffect } from 'react';
import Welcome from './pages/Welcome.jsx';
import Login from './pages/Login.jsx';
import { Auth } from './pages/Auth.jsx';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [emailValid, setEmailValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [allConditionsMet, setAllConditionsMet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const allValid = Object.values(passwordValidations).every(Boolean) && emailValid && usernameValid && (password === confirmPassword);
    setAllConditionsMet(allValid);
  }, [passwordValidations, emailValid, usernameValid, password, confirmPassword]);

  const validatePassword = (password) => {
    const length = password.length >= 8 && password.length <= 15;
    const uppercase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setPasswordValidations({ length, uppercase, number, specialChar });
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const validateUsername = (username) => {
    const usernameValid = username.length > 0;
    setUsernameValid(usernameValid);
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    validateUsername(newUsername);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('https://pudge-backender.org.kg/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      console.log('Response data:', data); 
      if (response.ok) {
        localStorage.setItem('email', email); 
        localStorage.setItem('username', username); 
        localStorage.setItem('password', password); 
        alert('Регистрация успешна');
        navigate('/welcome');
      } else {
        alert(data.message || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка регистрации');
    }
  };

  const handleGoBack = () => {
    navigate('/login'); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="lorby-background">
          <img src={lorbyImage} alt="Lorby background" />
        </div>
        <div className="auth-container">
          <div className="back-btn" onClick={handleGoBack}>
            <ArrowLeft />
            <p>Назад</p>
          </div>
          <div className="auth-create">
            <p>Создать аккаунт <br /> Lorby</p>
          </div>
          <div className="form-container">
            <form onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Введи адрес почты"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <input
                type="text"
                placeholder="Придумай логин"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Создай пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                  <EyeIcon />
                </span>
              </div>
              <ul className="password-requirements">
                <li className={passwordValidations.length ? 'valid' : ''}>
                  От 8 до 15 символов {passwordValidations.length && '✅'}
                </li>
                <li className={passwordValidations.uppercase ? 'valid' : ''}>
                  Строчные и прописные буквы {passwordValidations.uppercase && '✅'}
                </li>
                <li className={passwordValidations.number ? 'valid' : ''}>
                  Минимум 1 цифра {passwordValidations.number && '✅'}
                </li>
                <li className={passwordValidations.specialChar ? 'valid' : ''}>
                  Минимум 1 спецсимвол (!, ", #, $, ...) {passwordValidations.specialChar && '✅'}
                </li>
              </ul>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Повтори пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="show-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <EyeIcon />
                </span>
              </div>
              <button type="submit" className={allConditionsMet ? 'active' : ''} disabled={!allConditionsMet}>
                Далее
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
