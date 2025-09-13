
import "./PaymentPage.css"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import Confirmlogout from "../Confirmlogout/Confirmlogout";
// import { faUser,faShoppingCart,faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Cookies from "js-cookie"; 
// import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

function PaymentPage() {

  
  const [showConfirm, setShowConfirm] = useState(false);
    const navigate=useNavigate();
    



    // const handleLogoutClick = () => {
    //       setShowConfirm(true);
    //     };
        
        const handleLogoutConfirm = () => {
          Cookies.remove("jwttoken");
          setShowConfirm(false); // Hide the modal
          navigate('/login'); // Navigate to the login page
        };
      
        // This function is called when the user cancels logout
        const handleLogoutCancel = () => {
          setShowConfirm(false); // Just hide the modal
        };
        

  return (
    <div>

     <Navbar/>
      <div className="tick">
        
      <img src="https://res.cloudinary.com/dedmnd9gb/image/upload/v1756806819/7cd06ab0-9ef0-40f8-b2ed-477723f050e7_jnadib.jpg" className="payment-image1"/>
      {/* <img src="https://res.cloudinary.com/dedmnd9gb/image/upload/v1752138022/Vector_orbedn.png" className="payment-image2"/> */}
      </div>
      <div className="lag">
      <h2 className="payment-head">Payment SuccessFul</h2>
      <p className="payment-para1">Thanks for ordering.</p>
      <p className="payment-para2">Your Payment is successfully completed.</p>
      <div>
        <button className="payment-btn" onClick={()=>{navigate('/home')}}>Return to Home page</button>
      </div>
      </div>
       <footer className="footer footer1">
    <div className="footer-content">
      <p>For any queries, contact <strong>+91-9876543210</strong><br />
      or mail us <a href="mailto:help@nxtmart.co.in">help@nxtmart.co.in</a></p>

      <div className="social-icons">
        <FontAwesomeIcon className="social-icons1" icon={faFacebookF} />
        <FontAwesomeIcon className="social-icons1" icon={faPinterestP} />
        <FontAwesomeIcon className="social-icons1" icon={faTwitter} />
        <FontAwesomeIcon className="social-icons1" icon={faInstagram} />
      </div>

      <p className="copyright">
        Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd
      </p>
    </div>
  </footer>
  {showConfirm && (
        <Confirmlogout 
          onLogout={handleLogoutConfirm} 
          onCancel={handleLogoutCancel} 
        />
      )}
    </div>
  )
}

export default PaymentPage

