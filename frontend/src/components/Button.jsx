import React from 'react';

const PaytmButton = ({ label, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PaytmButton;
