import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from "react-redux";
import Store from './Components/Store.js'


createRoot(document.getElementById('root')).render(
  
  
  <StrictMode>
  
    <BrowserRouter>
    <Provider store={Store}>
    {/* <ProtectedRoute> */}
    <App />
    {/* </ProtectedRoute> */}
    </Provider>
    </BrowserRouter>
   
  </StrictMode>
)
