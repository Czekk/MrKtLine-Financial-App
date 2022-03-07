import React, { useCallback, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './UseAuth';

const RequireAuth = ({children}) => {
    let auth = useAuth();
    let location = useLocation();

    const authConfig=useCallback(() =>{
      if(!auth.isLoggedIn){
        return <Navigate to='/logIn' state= {{from:location}} replace/>
    }
  return children;
    },[auth.isLoggedIn, location, children]);
    
  useEffect(()=>{authConfig()},[authConfig])
  return (authConfig());
};

export default RequireAuth;
