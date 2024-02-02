import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Appbar() {
  return (
    <div className="bg-blue-500 shadow-md h-16 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="flex items-center ml-4 text-white">
        <span className="text-lg font-semibold">PayTM Wallet</span>
      </div>
      <div className="flex items-center mr-4">
        <div className="flex items-center text-white mr-4">
          <span className="mr-2">Welcome!</span>
          <div className="rounded-full h-12 w-12 bg-blue-100 flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-xl font-semibold text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
