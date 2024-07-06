import './App.css';
import { ArrowLeft } from './assets/icons/ArrowLeft';
import { EyeIcon } from './assets/icons/EyeIcon.tsx';
import lorbyImage from './assets/images/lorby-background.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='lorby-background'>
          <img src={lorbyImage} alt="Lorby background" />
        </div>
        <div className='auth-container'>
          <div className='back-btn'>
            <ArrowLeft />
            <p>Назад</p>
          </div>
          <div className='auth-create'>
            <p>Создать аккаунт <br /> Lorby</p>
          </div>
          <div className='form-container'>
            <form>
              <input type="email" placeholder="Введи адрес почты" />
              <input type="text" placeholder="Придумай логин" />
              <div className="password-input">
                <input type="password" placeholder="Создай пароль" />
                <span className="show-password"><EyeIcon/></span>
              </div>
              <ul className="password-requirements">
                <li>От 8 до 15 символов</li>
                <li>Строчные и прописные буквы</li>
                <li>Минимум 1 цифра</li>
                <li>Минимум 1 спецсимвол (!, ", #, $, ...)</li>
              </ul>
              <div className="password-input">
                <input type="password" placeholder="Повтори пароль" />
                <span className="show-password"><EyeIcon/></span>
              </div>
              <button type="submit">Далее</button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
