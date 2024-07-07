import lorbyImage from '../assets/images/lorby-background.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../components/Modal';

export const Auth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    navigate('/'); 
  };  

  return (
    <div className="App">
      <header className="App-header">
        <div className="welcome">
          <h1>С возвращением!</h1>
          <div className="lorby-background">
            <img src={lorbyImage} alt="Lorby background" />
          </div>
          <p className="logout" onClick={handleOpenModal}>Выйти</p>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirm} />
    </div>
  )
}
