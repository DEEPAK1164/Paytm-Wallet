// ... (other imports)

import { useState } from 'react';
import Button from '../components/Button';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import SubHeading from '../components/SubHeading';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className='bg-indigo-200 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-4 relative'>
        <button 
            className="absolute top-2 right-2 p-1 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 text-sm"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
          <Heading label={'Sign In'} />
          <SubHeading label={'Enter your credentials to access your account'} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
              setError(''); // Clear error when the username is changed
            }}
            label={'Username'}
            type={'email'}
            placeholder={'Enter your Username'}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
              setError(''); // Clear error when the password is changed
            }}
            label={'Password'}
            type={'password'}
            placeholder={'Enter your password '}
          />
          <div className='pt-6'>
            <Button onClick={async () => {
              try {
                const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                  username,
                  password,
                });
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
              } catch (error) {
                setError('Invalid credentials. Please check your username and password.');
              }
            }} label={'Sign In'} />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <BottomWarning label={"Don't have an account?"} to={'/signup'} buttonText={'Sign up'} />
        </div>
      </div>
    </div>
  );
}
