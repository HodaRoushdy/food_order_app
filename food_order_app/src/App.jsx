
import { useState } from 'react'
import UserForm from './components/userForm/UserForm';
import { useEffect } from 'react';
import Meals from './components/meals/Meals';
import Header from './components/header/Header';
import './App.css';
import { CartProvider } from './store/CartProvider';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  useEffect(() => {
  const check = localStorage.getItem('user');
    setUserLoggedIn(check ? true : false)
  },[])
   
if (!userLoggedIn) {
  return <UserForm />;
}
 
return (
 
  <CartProvider>
<Header />
<Meals />
  </CartProvider>
  

 
); 
}

export default App
