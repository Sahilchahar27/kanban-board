import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-4"> 
        <button
          onClick={onClose}
          className="text-gray-500 float-right text-lg hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
