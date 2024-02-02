import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import { Users } from '../components/Users';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [value, setValue] = useState('00');
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to continue');
    navigate('/signin');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          Accept: '*/*',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setValue(response.data.balance);
      });
  }, [token]);

  return (
    <div>
      <Appbar />
      <div className='m-8 pt-20'> {/* Added pt-20 for padding top */}
        <div className='m-5 flex justify-between'>
          <Balance value={parseFloat(value).toFixed(2)} />
          <button
            onClick={() => handleLogout()}
            className='bg-gray-500 px-5 py-3 rounded-full text-white hover:bg-red-700'
          >
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
            Logout
          </button>
        </div>
        <Users />
      </div>
    </div>
  );
}
