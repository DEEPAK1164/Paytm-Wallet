// ... (other imports)

import { useState } from 'react';
import Button from '../components/Button';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import SubHeading from '../components/SubHeading';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Check if any of the fields are empty
    if (!firstName || !lastName || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Proceed with the API call if all fields are filled
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName,
        lastName,
        username,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      // Handle API call errors
      console.error("Error during signup:", error);

      // Check if the user already exists
      if (error.response && error.response.status === 411) {
        setUserExists(true);
      } else {
        // Add any additional error handling logic here
      }
    }
  };

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
          <Heading label={"Sign up"} />
          <SubHeading label={"Create an account to get started"} />
          <InputBox onChange={(e) => { setFirstName(e.target.value) }} label={"First Name"} type={"text"} placeholder={"John"} />
          <InputBox onChange={(e) => { setLastName(e.target.value) }} label={"Last Name"} type={"text"} placeholder={"Doe"} />
          <InputBox onChange={(e) => { setUsername(e.target.value) }} label={"Username"} type={"text"} placeholder={"Enter your Username"} />
          <InputBox onChange={(e) => { setPassword(e.target.value) }} label={"Password"} type={"password"} placeholder={"Enter your password "} />
          <div className='pt-6'>
            <Button onClick={handleSignup} label={"Signup"} />
            {userExists && (
              <p className="text-red-500 mt-2">User with this username already exists. Please choose a different one.</p>
            )}
          </div>
          <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"} />
        </div>
      </div>
    </div>
  );
}