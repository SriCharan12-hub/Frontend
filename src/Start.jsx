import React from 'react'
// import { GoogleLogin } from '@react-oauth/google'
// import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import './Start.css'
// import { json } from 'express'

function Start() {
    const navigate= useNavigate()
  return (
    // <div>
    //   <GoogleLogin onSuccess={(CredentialResponse)=>{
    //     const data = jwtDecode(CredentialResponse.credential)
    //     localStorage.setItem('userid',JSON.stringify(data.name))
    //     navigate('/home')

    //   }} onError={()=>console.log("error in google oauth")}>
    //   </GoogleLogin>
    //   <button onClick={()=>{navigate('/register')}}>Register</button>
    //   <button onClick={()=>{navigate('/login')}}>Login</button>
    // </div>
    <div className='landing-con'>
        <div className="content-box">
          <h1 className="title" style={{color:'purple'}}>Welcome</h1>
          <p className="subtitle">Please choose an option to continue.</p>

          

          <div className="button-group">
            <button className="button register-btn" onClick={()=>{navigate('/register')}}>Register</button>
            <button className="button login-btn" onClick={()=>{navigate('/login')}}>Login</button>
          </div>
        
        </div>
      </div>
  )
}

export default Start
