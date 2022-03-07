import React, { useState } from 'react';
import UserContext from '../Context/UserContext';

const AuthProvider = ({children}) => {

const [user, setUser] = useState({...JSON.parse(localStorage.getItem('userInfo'))});

const signIn = (newUser)=>{
    const newuser= {...newUser, isLoggedIn: true};
    localStorage.setItem('userInfo', JSON.stringify({...newuser}));
    setUser(newuser);
}
const updateUser= (update)=>{
  const updatedUser= {...update, isLoggedIn: true, token: user.token};
  localStorage.removeItem('userInfo');
  localStorage.setItem('userInfo', JSON.stringify({...updatedUser}));
  setUser(updatedUser);
}

const signOut = ()=>{
    localStorage.removeItem('userInfo');
    setUser(null);
}

const value = {...user, signIn, signOut, updateUser}
  return <UserContext.Provider value= {value}>{children}</UserContext.Provider>;
};

export default AuthProvider;
