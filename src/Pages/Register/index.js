import React, { useEffect, useState } from 'react';
import { Col, Button, Form, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import useControl from '../../Context/UseControl';
import UserService from '../../Services/UserService';
import styles from './register.module.css'

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: null,
        lastname: null,
        email: null,
        username: null,
        password: null,
        confirmPassword: null
    });

    const [isRegistrationSuccess, setRegistrationSuccess] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(1);
    const [isFormDisabled, setIsFormDisabled] = useState(0);
    const [formFeedback, setFormFeedback] = useState('')
    const [validationFeedback, setValidationFeedback] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const control= useControl();
    useEffect(()=>{control.deleted=false}, [control])
    useEffect(()=>{document.title= 'MrKtLine Register'})

    const validation=async (field, value)=>{
        const data = {...formData};
        let valid;
        switch (field) {
            case 'firstname':
                if(value.length<3){
                    setValidationFeedback({...validationFeedback, firstname: '*must contain atleast 3 letters!'})
                    valid={...validationFeedback, firstname: '*must contain atleast 3 letters!'}
                }
                else{
                    setValidationFeedback({...validationFeedback, firstname: null})
                    valid={...validationFeedback, firstname: null}
                }
                break;

            case 'lastname':
                if(value.length<1){
                    setValidationFeedback({...validationFeedback, lastname: '*must contain atleast 1 letters!'})
                    valid={...validationFeedback, lastname: '*must contain atleast 1 letters!'}
                }
                else{
                    setValidationFeedback({...validationFeedback, lastname: null})
                    valid={...validationFeedback, lastname: null}
                }
                break;

            case 'email':
                if(!value.includes('@') || !value.includes('.')){
                    setValidationFeedback({...validationFeedback, email: '*enter a valid email!'})
                    valid={...validationFeedback, email: '*enter a valid email!'}
                }
                else{
                    setValidationFeedback({...validationFeedback, email: null})
                    valid={...validationFeedback, email: null}
                }
                break;

            case 'username':
                if (value.length<4){
                    setValidationFeedback({...validationFeedback, username: '*must contain atleast 4 letters'})
                    valid={...validationFeedback, username: '*must contain atleast 4 letters'}
                }
                else{
                    const userFound= await UserService.get({username: value})
                    if(userFound.ok){
                        setValidationFeedback({...validationFeedback, username: '*username already taken!'})
                        valid={...validationFeedback, username: '*username already taken!'}
                    }
                    else{
                        setValidationFeedback({...validationFeedback, username: null})
                        valid={...validationFeedback, username: null}
                    }
                }
                
                break;

            case 'password':
                if(value.length < 6){
                    setValidationFeedback({...validationFeedback, password: '*must contain atleast 6 characters'})
                    valid={...validationFeedback, password: '*must contain atleast 6 characters'}
                }
                else{
                    setValidationFeedback({...validationFeedback, password: null})
                    valid={...validationFeedback, password: null}
                }
                break;

            case 'confirmPassword':
                if(data?.password !== value){
                    setValidationFeedback({...validationFeedback, confirmPassword: '*passwords do not match!'})
                    valid={...validationFeedback, confirmPassword: '*passwords do not match!'}
                }
                else{
                    setValidationFeedback({...validationFeedback, confirmPassword: null})
                    valid={...validationFeedback, confirmPassword: null}
                }
                break
            default:
                break;
        }
        if (
        checkSubmitDisabled(valid)
        ){
            setIsSubmitDisabled(0)
        }
        else{setIsSubmitDisabled(1)}
        
    }

    const checkSubmitDisabled=(valid)=>{
        let count=0;
        for (var key in valid){
            if(valid[key]=== null){
                count++
            }
        }
        if (count===6){
            return true;
        }
        else {return false;}
    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
        validation(e.target.name, e.target.value);
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        setIsFormDisabled(1);
        setFormFeedback('');
        const userdata= {...formData, status: 'user'}
        const response= await UserService.register(userdata);
        if(!response.ok){
            setFormFeedback(`Registration failed! Please try again! ${response.message}`);
            setIsFormDisabled(0);
            throw new Error('Registration failed');
        }
        else{
            setFormFeedback('User registration successful!');
            setRegistrationSuccess(1);
        }
    }
  return <>
    <div className={styles.register_wrapper}>
        <Col className='m-0 p-0'>
            <div className={styles.register_card}>
                <div className={styles.register_header}>
                    <h5>{isRegistrationSuccess?'Registered!':'Register'}</h5>
                </div>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    {isRegistrationSuccess? <><p className='text-success text-center' >User Registration Successful!!</p>
                    <p className=' text-center'>Click here to: <LinkContainer to='/logIn'><Link to='/logIn'>login</Link></LinkContainer></p></>:
                    <>
                    <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <FormControl onChange={(e)=>{handleChange(e)}} name='firstname' type='text' disabled= {isFormDisabled}/>
                        <FormText className='text-danger'>{validationFeedback.firstname}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl onChange={(e)=>{handleChange(e)}} name='lastname' type='text' disabled= {isFormDisabled}/>
                        <FormText className='text-danger'>{validationFeedback.lastname}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl onChange={(e)=>{handleChange(e)}} name='email' type='email' disabled= {isFormDisabled}/>
                        <FormText className='text-danger'>{validationFeedback.email}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>User Name</FormLabel>
                        <FormControl onChange={(e)=>{handleChange(e)}} name='username' type='text' disabled= {isFormDisabled}/>
                        <FormText className='text-danger'>{validationFeedback.username}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <FormControl onChange={(e)=>{handleChange(e)}} name='password' type='password' disabled= {isFormDisabled}/>
                        <FormText className='text-danger'>{validationFeedback.password}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl onChange={(e)=>{handleChange(e)}} name='confirmPassword' type='password' disabled= {isFormDisabled}/>
                        <FormText className='text-danger'>{validationFeedback.confirmPassword}</FormText>
                    </FormGroup>
                    <Button className='m-3 shadow-none' type='submit' variant='primary' disabled={isSubmitDisabled || isFormDisabled}>Submit</Button>
                    <LinkContainer to='/logIn'><Button className='m-3 shadow-none' variant= 'primary'>Cancel</Button></LinkContainer>
                    <FormText className={formFeedback==='User registration successful!'?'text-success': 'text-danger'}>{formFeedback}</FormText>
                    </>}
                </Form>
            </div>
        </Col>
    </div>
  </>;
};

export default Register;
