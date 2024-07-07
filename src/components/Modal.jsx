import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Выйти?</h2>
        <p>Точно выйти?</p>
        <button className="confirm-button" onClick={onConfirm}>Да, точно</button>
        <button className="cancel-button" onClick={onClose}>Нет, остаться</button>
      </div>
    </div>
  );
};

export default Modal;
