import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { removing, setCart, updateQuantity } from "../Slice";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Confirmlogout from "../Confirmlogout/Confirmlogout";
import Navbar from "../Navbar/Navbar";

function Cart() {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const cardItems = useSelector((store) => store.Cartstate.cardItems);
  const navigate = useNavigate();

  // Save cart to localStorage whenever cardItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cardItems));
  }, [cardItems]);

  useEffect(() => {
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
  }, [dispatch]);

  const emptylist = [];
  const qunatitylist = [];

  cardItems.forEach((each) => {
    const length = each.price.length;
    const integer = parseFloat(each.price.slice(1, length));
    const totalValue = each.quantity * integer;
    emptylist.push(totalValue);
    qunatitylist.push(each.quantity);
  });

  const TotalAmount = emptylist.reduce((acc, ref) => acc + ref, 0);
  let totalItems = qunatitylist.reduce((acc, item) => acc + item, 0);

  const adding = async (item) => {
    try {
      const token = Cookies.get("jwttoken");
      await axios.post("https://mern-backend-h2tw.onrender.com/cart/update-quantity", {
        productId: item.productId,
        action: 'increase'
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateQuantity({ productId: item.productId, action: 'increment' }));
    } catch (error) {
      console.error("Error updating quantity on backend", error);
    }
  };

  const subtracting = async (item) => {
    try {
      const currentItem = cardItems.find(cartItem => cartItem.productId === item.productId);
      const token = Cookies.get("jwttoken");

      if (currentItem && currentItem.quantity === 1) {
        await axios.delete("https://mern-backend-h2tw.onrender.com/cart/delete", {
          data: { productId: item.productId },
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(removing({ productId: item.productId }));
      } else {
        await axios.post("https://mern-backend-h2tw.onrender.com/cart/update-quantity", {
          productId: item.productId,
          action: 'decrease'
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(updateQuantity({ productId: item.productId, action: 'decrement' }));
      }
    } catch (error) {
      console.error("Error updating quantity or removing item from backend", error);
    }
  };

  const deleting = async (item) => {
    try {
      await axios.delete("https://mern-backend-h2tw.onrender.com/cart/delete", {
        data: {
          productId: item.productId
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("jwttoken")}`,
        },
      });
      dispatch(removing({ productId: item.productId }));
    } catch (error) {
      console.error("Error deleting item from cart", error);
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
  const functiondelete=async()=>{

     await axios.put('https://mern-backend-h2tw.onrender.com/cart/clear',
      {},
      {
        headers:{
          Authorization: 
          `Bearer ${Cookies.get("jwttoken")}`,
        }
      }
    )
  
    navigate('/payment',totalItems)
    window.scrollTo(0,0)
  }

  return (
    <div className="cart-container">
      <Navbar totalItems={totalItems} />
      <div className="cart-full-width">
        {cardItems.length === 0 ? (
          <div className="empty-cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cart-icon">
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            <p className="cart-para">Your Cart is Empty</p>
          </div>
        ) : (
          <div>
            <h1>Items</h1>
            <div className="cart-box">
              {cardItems.map((item) => (
                <div className="cart-item" key={item.productId}>
                  <img src={item.image} alt={item.name} className="item-img" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.weight}</p>
                    <h4>{item.price}</h4>
                    <h4>Total: ₹{((item.price).slice(1)) * item.quantity}</h4>
                    <button className="remove-btn" onClick={() => { deleting(item); }}>Remove</button>
                  </div>
                  <div className="item-qty">
                    <button className="minus-btn" onClick={() => { subtracting(item); }}>-</button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button className="plus-btn" onClick={() => { adding(item); }}>+</button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="cart-footer">
                <h3>Total ({totalItems} items): ₹ {TotalAmount}</h3>
                <button className="checkout-btn" onClick={functiondelete}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
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

export default Cart;