import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'

function Signup() {
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");
  const [showpassword,setShowpassword] = useState(false)



  function HandleInput(){
    setShowpassword(prev=>!prev) 
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill in all the details.');
      return;
    }

    try {
      const response = await axios.post('https://mern-backend-h2tw.onrender.com/register', {
        email,
        username,
        password,
      });
      console.log('Registration successful:', response.data);
      if (response.status === 201) {
        setUsername('');
        setPassword('');
        setEmail('');
        navigate('/login');
      }
    } catch (error) {
  if (error.response) {
    // Show backend error message (like duplicate email, invalid format, etc.)
    setError(error.response.data.message || "Something went wrong");
  } else if (error.request) {
    // If request was made but no response
    setError("No response from server. Please try again.");
  } else {
    // Other unknown error
    setError("Unexpected error occurred");
  }
}
  };

  return (
    <div className='con'>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          value={username}
          placeholder='Enter username'
          className='nameele'
          onChange={(e) => setUsername(e.target.value)}
        />
        <span id="errorname"></span>
        <input
          type='email'
          value={email}
          placeholder='Enter email'
          className='emaille'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showpassword ? 'text' : 'password'}
          value={password}
          placeholder='Enter Password'
          className='passele'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className='registerpara'>
        <input type="checkbox" onChange={HandleInput}/> Show password
        </label>
        <button onClick={()=>{navigate('/')}}>Back</button>
        <button type='submit'>Submit</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        <p className='regpara'>Already i'm registered <span className ="reglogin" onClick={()=>{navigate('/login')}}>Login</span></p>
      </form>
      
    </div>
  );
}

export default Signup;