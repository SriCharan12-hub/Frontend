import './UpdatedSuccessfully.css'
import { useNavigate } from 'react-router-dom';

const UpdatedSuccessfully = () => {
    const navigate = useNavigate()
  return (
    <div className="success-container">
      <div className="success-content">
        <h1 className="success-heading">Success!</h1>
        <p className="success-message">Your information has been successfully updated.</p>
           <svg
          className="checkmark-static-container"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-static-circle"
            cx="26"
            cy="26"
            r="25"
          />
          <path
            className="checkmark-static-tick"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
         <button className='back-button' onClick={()=>navigate('/home')}>Back to Home</button>
        </div>
       
    </div>
  );
};

export default UpdatedSuccessfully;