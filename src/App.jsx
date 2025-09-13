
import './App.css'


import { Routes,Route } from 'react-router-dom'

import Start from './Start'

import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import HomeError from './Components/HomeError/HomeError'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import PaymentPage from './Components/PaymentPage/PaymentPage'
import ProtectedRoute from './Components/ProtectedRoute'
import Confirmlogout from './Components/Confirmlogout/Confirmlogout'
import ShowUserDetails from './Components/ShowUserDetails/ShowUserDetails'
import Navbar from './Components/Navbar/Navbar'
import { useState } from 'react'
import UpdatedSuccessfully from './Components/UpdatedSuccessfully/UpdatedSuccessfully'
// import Previous from './Components/Previous/Previous'


function App() {
  const [showConfirm, setShowConfirm] = useState(false);


  return (
    <>
   
    <Routes> 
      <Route path ='/' element={<Start/>}></Route>
      <Route path="/register" element={<Signup/>}></Route> 
      <Route path ='/login' element={<Login/>}></Route>
      <Route path="/home" element={<ProtectedRoute><Home  showConfirm={showConfirm} setShowConfirm={setShowConfirm} /></ProtectedRoute>}></Route>
      <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}></Route>
      <Route path='/payment' element={<ProtectedRoute><PaymentPage/></ProtectedRoute>}></Route>
     <Route path="/homeerror" element={<ProtectedRoute><HomeError/></ProtectedRoute>}></Route>
     <Route path='*' element={<ProtectedRoute><PageNotFound/></ProtectedRoute>}></Route>
     <Route path='/confirmlogout' element={<ProtectedRoute><Confirmlogout/></ProtectedRoute>}></Route>
     <Route path='/showuserdetails' element={<ProtectedRoute><ShowUserDetails/></ProtectedRoute>}></Route>
      <Route path='/updatedsuccessfully' element={<ProtectedRoute><UpdatedSuccessfully/></ProtectedRoute>}></Route>
      <Route path='/navbar' element={<ProtectedRoute><Navbar  setShowConfirm={setShowConfirm} /></ProtectedRoute>}></Route>
       {/* <Route path='/previous' element={<ProtectedRoute><Previous/></ProtectedRoute>}></Route> */}
     </Routes>
      
    </>
  )
}

export default App
