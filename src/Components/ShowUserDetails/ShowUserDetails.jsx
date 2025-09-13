import React, { useState, useEffect } from 'react';
import './ShowUserDetails.css';
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ShowUserDetails = () => {
    const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [showpassword,setShowPassword] = useState(false)
  const [showpassword1,setShowPassword1] = useState(false)
  const [error,setError] = useState("")

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get("https://mern-backend-h2tw.onrender.com/user/get", {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwttoken")}`,
          },
        });
        // console.log("userdetails", res.data);
        setPassword(res.data.result.password);
        setUsername(res.data.result.username);
        setEmail(res.data.result.email);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateUser = await axios.put(
        "https://mern-backend-h2tw.onrender.com/user/update",
        {
          password: formPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwttoken")}`,
          },
        }
      );
      console.log("updated user", updateUser);
       // don’t show raw password
      setError("")
      setFormPassword("");
      setConfirmPassword("");
      navigate('/updatedsuccessfully')
    } catch (err) {
      console.error("Update failed:", err);
       if (err.response && err.response.data.message) {
            setError(err.response.data.message);
          } 
          else {
            setError("Fill all the details");
      }
    }
  };

  return (
    <div className="two-sections">
        <button className='back-button' onClick={()=>navigate('/home')}>Back</button>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> */}
      {/* Profile Section */}
      <div className="section-half">
        <div className="profile-card animate-fadeIn">
          <h1 className="title">My Profile</h1>

          <div className="info-section">
            <div className="info-group">
              <span className="info-label">Username:</span>
              <span className="info-value">{username}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Email:</span>
              <span className="info-value">{email}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Password:</span>
              <span className="info-value">{password}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Update Section */}
      <div className="section-half">
        <div className="profile-card animate-fadeIn">
          <h1 className="title">Update Profile</h1>

          <form onSubmit={handleUpdate}>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                
                New Password
              </label>
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                className="input-field"
              />
              <input type='checkbox'  style={{marginTop:"10px"}}  onChange={()=>setShowPassword(prev=>!prev)}/> Show Password
            </div>

            <div className="input-group">
              <label htmlFor="confirmpassword" className="input-label">
                Confirm Password
              </label>
              <input
                type={showpassword1 ? "text": "password"}
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
                <input type='checkbox'  style={{marginTop:"10px"}}  onChange={()=>setShowPassword1(prev=>!prev)}/> Show Password
            </div>
            {error && <p style={{color:"red", textAlign:"center"}}>{error}</p>}

            <button type="submit" className="update-button" >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShowUserDetails;
