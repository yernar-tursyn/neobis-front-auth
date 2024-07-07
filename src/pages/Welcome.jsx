import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lorbyImage from '../assets/images/lorby-background.png';
import Modal from '../components/Modal';
import '../App.css';

const Welcome = () => {
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
          <h1>Добро пожаловать!</h1>
          <div className="lorby-background">
            <img src={lorbyImage} alt="Lorby background" />
          </div>
          <p className="logout" onClick={handleOpenModal}>Выйти</p>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirm} />
    </div>
  );
};

export default Welcome;
