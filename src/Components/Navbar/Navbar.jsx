import React from 'react'

import { faUser,faShoppingCart,faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
 import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Previous from '../Previous/Previous';
import './Navbar.css'

function Navbar({setShowConfirm}) {
    const navigate = useNavigate();
    const cardItems = useSelector((store) => store.Cartstate.cardItems);
    const totalItems = cardItems.reduce((acc, item) => acc + item.quantity, 0);
      
  


     const handleLogoutClick = () => {
        setShowConfirm(true);
  };


  return (

    <div>
        <div className='Home-Nav'>
                <img
                  src="https://res.cloudinary.com/dedmnd9gb/image/upload/v1751948449/6fad20838855997d164dd88d885fad87bdfa3be6_qwzvhr.png"
                  className='Home-image'
                  onClick={() => navigate('/home')}
                />
                <div className='Home-Nav1'>
                  <FontAwesomeIcon icon={faHouse} className='Home-1' onClick={() => navigate('/home')} />
                  <div className="cart-wrapper">
        
                  <FontAwesomeIcon icon={faShoppingCart} className="Home-1"  onClick={() => navigate('/cart')}/>
                  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </div>
                  {/* <h2 className='Home-1' onClick={() => navigate('/cart')}>Cart</h2>
                  {cardItems.length > 0 && <span className="cart-badge">{cardItems.length}</span>} */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleLogoutClick} // Call the new handler
                    width="50"
                    height="50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#fff"
                    backgroundColor="black"
                    style={{ cursor: "pointer" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                  </svg>
                   <FontAwesomeIcon icon={faUser} className="user-icon" onClick={()=>navigate('/showuserdetails')}
                    style={{ cursor: "pointer", height: "30px", width: "30px", marginLeft:"2px" }}/>
                  
                </div>
              </div>
      
    </div>
  )
}

export default Navbar
