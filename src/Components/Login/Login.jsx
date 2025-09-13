import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [password,setPassword]= useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    const [button,setButton]=useState(false)
    const [check,setCheck]= useState(false)
    const jwdtoken = Cookies.get('jwttoken')

      useEffect(() => {
      if (jwdtoken !== undefined) {
        navigate('/home')
      }
    }, [jwdtoken, navigate]);


    function HandleInput(){
    setCheck(prev=>!prev)
    }

    const handlesubmit= async(e)=>{
        e.preventDefault()
        //  if (!email || !password){
        //    return  alert("Fill all the details")
        // }
        try{
          const verifying =await  axios.post("https://mern-backend-h2tw.onrender.com/login",{email,password})
          if (verifying.status==200){
          Cookies.set("jwttoken",verifying.data.jwttoken)
            setEmail("")
            setPassword("")
            navigate('/home')
          }
         

        }
        catch(error){
          console.log("error",error)
          if (error.response && error.response.data.message) {
            setError(error.response.data.message);
          } 
          else {
            setError("Fill all the details");
      }
        }
        
    }
     useEffect(()=> {
    if ((email!=="") && (password!=="")){
    setButton(true)
    }
    else{
      setButton(false)

    }
  },[email,password])
  return (
    // <div className='con'>
    //    <input type="text" value={email} placeholder="Enter email" className="emaille" onChange={(e)=>setEmail(e.target.value)}/>
      
    //     <input type="text" value={password} placeholder="Enter Password" className='passele' onChange={(e)=>setPassword(e.target.value)}/>
    //     {error && <p style={{ color: "red" }} >{error}</p>}
    //     <button onClick={()=>{navigate('/')}}>Back</button>
    //     <button onClick={handlesubmit}>Login</button>
    // </div>
    <form className='Login-Container' onSubmit={handlesubmit}>
      <div className="Login-Con">
      <img src="https://res.cloudinary.com/dedmnd9gb/image/upload/v1751948449/6fad20838855997d164dd88d885fad87bdfa3be6_qwzvhr.png" className='login-image'/>
      <div className='Form-Container'>
        <div className='form-label'>
        <label>Email</label>
        <input type="text" className='type-text'  onChange={(e)=>{setEmail(e.target.value)}} value={email}/>

        </div>
        <div className='form-label'>
        <label>Password</label>
        <input type={check ? 'text' : 'password'} className='type-password'  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        {/* <input type='checkbox' className='checkbox' onChange={HandleInput} /> */}




       <label className='registerpara1'>
        <input type="checkbox" onChange={HandleInput}/> Show password
        </label>

        {/* <h3 className='show-pass'>Show Password</h3> */}
         {error && <p className='login-error'>{error} </p>}
        <button className={button ? 'login-Btn' : 'login-btn'} >Login</button>
         <button className="back-btn" onClick={()=>{navigate('/')}}>Back</button>
        <p className='text-para'>Don't have an account <span className='registerbtn' onClick={()=>{navigate('/register')}}>Register</span></p>
       

        </div>
      </div>


      </div>
      
    </form>
  )


}
export default Login