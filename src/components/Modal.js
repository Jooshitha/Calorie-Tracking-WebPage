import React, { useEffect } from 'react';

function Modal({ isOpen, closeModal }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <p>Meal added successfully!</p>
    </div>
  );
}

export default Modal;
