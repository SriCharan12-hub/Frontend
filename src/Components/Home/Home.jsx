import React, { useEffect, useState } from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../Navbar/Navbar';

// Correctly import only the necessary actions from your Redux slice
import { addToTask, removing, updateQuantity,setCart } from '../Slice';
import Categories from '../Categories/Categories';
import Cookies from 'js-cookie';
import axios from "axios";
import Confirmlogout from '../Confirmlogout/Confirmlogout'; 

function Home({ setShowConfirm, showConfirm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardItems = useSelector((store) => store.Cartstate.cardItems);
  const totalItems = cardItems.reduce((acc, item) => acc + item.quantity, 0);

  const [data, setData] = useState(null);
  const [allvalues, setAllvalues] = useState(null);
  const [click1, setClick] = useState(null);
  const [categorieslist, setCategorieslist] = useState("All-categories");
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    // Fetch cart items from backend on initial render
    async function fetchCart() {
      try {
        const token = Cookies.get("jwttoken");
        const res = await axios.get("https://mern-backend-h2tw.onrender.com/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data && res.data.items) {
          dispatch(setCart(res.data.items));
        }
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    }
    fetchCart();
  }, [totalItems,dispatch]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://apis2.ccbp.in/nxt-mart/category-list-details");
      const result = await res.json();
      setData(result.categories);
      setAllvalues(result.categories);
    }
    fetchCategories();
  }, []);

  const functionHandle = async (eacharray) => {
    try {
      const token = Cookies.get("jwttoken");
      await axios.post(
        "https://mern-backend-h2tw.onrender.com/cart/add",
        {
          product: {
            ...eacharray,
            productId: Number(eacharray.id)
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addToTask({ ...eacharray, id: Number(eacharray.id), productId: Number(eacharray.id) }));
    } catch (error) {
      console.error("Error adding to cart", error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    }
  };
 
  const handleLogoutConfirm = () => {
    Cookies.remove("jwttoken");
    setShowConfirm(false); 
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowConfirm(false);
  };

  const categories1 = (eachdata) => {
    setClick(eachdata.name === "All-categories" ? null : eachdata.name);
    setCategorieslist(eachdata.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCategoryExpand = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleIncrease = async (item) => {
    try {
      const token = Cookies.get("jwttoken");
      await axios.post("https://mern-backend-h2tw.onrender.com/cart/update-quantity", {
        productId: Number(item.id),
        action: 'increase' // Changed to 'increase' to match your backend controller
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the Redux state after a successful backend update
      dispatch(updateQuantity({ productId: Number(item.id), action: 'increment' }));
    } catch (error) {
      console.error("Error updating quantity on backend", error);
    }
  };

  const handleDecrease = async (item) => {
    try {
      const currentItem = cardItems.find(cartItem => cartItem.productId === Number(item.id));
      const token = Cookies.get("jwttoken");

      if (currentItem && currentItem.quantity === 1) {
        // Remove from the backend first
        await axios.delete("https://mern-backend-h2tw.onrender.com/cart/delete", {
          data: { productId: Number(item.id) },
          headers: { Authorization: `Bearer ${token}` }
        });
        // Then remove from Redux state
        dispatch(removing({ productId: Number(item.id) }));
      } else {
        // Update quantity on the backend
        await axios.post("https://mern-backend-h2tw.onrender.com/cart/update-quantity", {
          productId: Number(item.id),
          action: 'decrease' // Changed to 'decrease' to match your backend controller
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Then update the Redux state
        dispatch(updateQuantity({ productId: Number(item.id), action: 'decrement' }));
      }
    } catch (error) {
      console.error("Error updating quantity or removing item from backend", error);
    }
  };

  const getProductQuantity = (productId) => {
    const item = cardItems.find(cartItem => cartItem.productId === Number(productId));
    return item ? item.quantity : 0;
  };

  return (
    <div className='Home-Container'>
      <Navbar setShowConfirm={setShowConfirm} showConfirm={showConfirm}/>
      <div className='Home-main'>
        <Categories
          click1={click1}
          data={data}
          categories1={categories1}
        />
        <div className='Home-con-2'>
          {allvalues === null ? (
            <img src="https://res.cloudinary.com/dedmnd9gb/image/upload/v1752135229/Group_936_fve1x4.png" className='loading-image' alt="Loading" />
          ) : (
            (click1 === null ? allvalues : allvalues.filter(each => each.name === categorieslist)).map(eachvalue => {
              const products = (eachvalue.products) ? eachvalue.products : [];
              const isExpanded = expandedCategories.includes(eachvalue.id);
              const displayedProducts = isExpanded ? products : products.slice(0, 4);
              return (
                <div key={eachvalue.id}>
                  <span className='category-name'>{eachvalue.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='icon12'>
                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                  </svg>
                  <div className='arranging1'>
                    {products.length > 0 ? displayedProducts.map(eacharray => {
                      const quantity = getProductQuantity(eacharray.id);
                      return (
                        <div className='arranging' key={eacharray.id}>
                          <div className='styling'>
                            <img className="images" src={eacharray.image} alt={eacharray.name} />
                            <div className='free'>
                              <h2>{eacharray.name}</h2>
                              <h3>{eacharray.weight}</h3>
                              <h3>{eacharray.price}</h3>
                            </div>
                          </div>
                          <div>
                            {quantity === 0 ? (
                              <button onClick={() => functionHandle(eacharray)} className='addbtn'>Add to Cart</button>
                            ) : (
                              <div className='item-qty'>
                                <button className="minus-btn" onClick={() => handleDecrease(eacharray)}>-</button>
                                <span className="item-quantity">{quantity}</span>
                                <button className="plus-btn" onClick={() => handleIncrease(eacharray)}>+</button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }) : <p>No products available</p>}
                  </div>
                  {products.length > 3 && (
                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                      <button className='viewbtn'
                        onClick={() => toggleCategoryExpand(eachvalue.id)}
                        style={{
                          backgroundColor: "#1dccebff",
                          color: "#fff",
                          border: "none",
                          padding: "10px 20px",
                          fontSize: "16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded ? "View Less" : "View All"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>
            For any queries, contact <strong>+91-9876543210</strong><br />
            or mail us <a href="mailto:help@nxtmart.co.in">help@nxtmart.co.in</a>
          </p>
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
  );
}

export default Home;