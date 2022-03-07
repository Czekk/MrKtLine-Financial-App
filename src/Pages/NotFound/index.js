import React, { useEffect } from 'react';
import { Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useAuth from '../../Auth/UseAuth';
import styles from './NotFound.module.css'

const NotFound = () => {
    const auth= useAuth()
    useEffect(()=>{document.title= 'MrKtLine NotFound'})
  return <>
        <div className={styles.NF_wrapper}>
            <div className={styles.NF_text}>
                <h2 className={styles.NF_text}>Error 404:</h2> 
                <h2 className={styles.NF_text}>Page Not Found!</h2>
                {auth?.isLoggedIn?
                <><p>Go to: <LinkContainer to='/'><Button size='sm'>Dashboard</Button></LinkContainer></p></>:
                <><p>Click here to: <LinkContainer to='/logIn'><Button size='sm'>Login</Button></LinkContainer></p></>}
            </div>
        </div>
  </>;
};

export default NotFound;
