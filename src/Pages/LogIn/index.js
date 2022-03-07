import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormText, InputGroup, Spinner } from 'react-bootstrap';
import { AiFillLock } from 'react-icons/ai';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import UserService from '../../Services/UserService';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../Auth/UseAuth';
import useControl from '../../Context/UseControl';

const LogIn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })
    const [error, setError] = useState();
    const [isLoading, setIsLoading]= useState(false);
    const location= useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const control = useControl();

    useEffect(()=>{document.title= 'MrKtLine Financial Corp - Login'})
    async function handleSubmit (e){
        e.preventDefault();
        try{
            setIsLoading(true);
            const response = await UserService.authenticate(formData);
            const res = await response.json();
            if (!response.ok){
                setError(res.message);
                console.log(res.message);
                throw new Error(res.message);
            }
            else {
            // localStorage.setItem('userInfo', JSON.stringify(res))
            const user = {...res
            }
            auth.signIn(user);
            control.currentPeriodHandler(res.preference.defaultPeriod);
            const {from} = location.state || {from: {pathname: '/'}};
            navigate(from, {replace: true});
        }
        }
        catch(error){
            console.error(error.message);
        } 
        setIsLoading(false);
    }

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleVisibility= useCallback(()=>{
        setIsVisible(!isVisible);
    }, [isVisible])

    useEffect(()=>{
        setIsVisible(false);
        return ()=>{setIsVisible(false)}
    },[])

  return <>
  <div className={styles.logInWrapper}>
  <Col className='p-0 m-0'>
    <div className={styles.logInCard}>
        <div className={styles.logInHeader}>
            <div className={styles.logoWarpper}>
                <AiFillLock/>
                <h5>Sign In</h5>
            </div>
            
        </div>
        {control.deleted? <p className='text-danger mx-auto'>Account has been deleted! </p>: null}
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId='username'>
                <FormControl className="mb-4" name='username' type='test' onChange={handleChange} placeholder='User Name*' />
            </FormGroup>
            <FormGroup controlId='password'>
                <InputGroup>
                    <FormControl className= 'mb-4'name='password' type={isVisible?'text':'password'} onChange={handleChange} placeholder='Password*'/>
                    <Button size='sm' className='float-end mb-4 shadow-none' variant='secondary' onClick={handleVisibility}>{isVisible? <MdVisibilityOff />:
                     <MdVisibility />}</Button>
                </InputGroup>
            </FormGroup>
            <FormText className='text-danger'>{error}</FormText>
            <FormGroup className="d-grid gap-2">
                <Button className={`mb-3 ${error? 'mt-1': 'mt-4'} shadow-none`} size='md' 
                variant='primary' type='submit'disabled={isLoading?true:false} >{isLoading?<Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />:'Sign In'}</Button>
            </FormGroup>
            <FormText> DON'T HAVE AN ACCOUNT? <LinkContainer to='/register' ><Link to='/register'>SIGN UP</Link></LinkContainer></FormText>
        </Form>

    </div>
    </Col>
  </div>
  
  </>;
};

export default LogIn;
