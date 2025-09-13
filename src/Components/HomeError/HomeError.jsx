import React from 'react'
import '../../index.css'
import { useNavigate } from 'react-router-dom'

function HomeError() {
    const navigate=useNavigate();
  return (
    <div>
      <div className='Home-Nav'>
        <img src="https://res.cloudinary.com/dedmnd9gb/image/upload/v1751948449/6fad20838855997d164dd88d885fad87bdfa3be6_qwzvhr.png" className='Home-image'/>
        <div className='Home-Nav1'>
            <h2 className='Home-1'>Home</h2>
            <h2 className='Home-1'>Cart</h2>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{navigate('/')}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 Home-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <h2 className='Home-3' >Logout</h2>

        </div>
      </div>
      <div className='Home-Error'>
        <img src="https://res.cloudinary.com/dedmnd9gb/image/upload/v1751984318/Group_7519_ta4vff.png" className='HomeError-image'/>
        <h2>Oops! something went wrong</h2>
        <p className='HomeError-para'>We are having some trouble</p>
        <button className='HomeError-btn'>Retry</button>
      </div>
    </div>
  )
}

export default HomeError
