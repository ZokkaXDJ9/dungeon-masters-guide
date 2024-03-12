// src/components/Modal.jsx

import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div style={{ background: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 20 }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
