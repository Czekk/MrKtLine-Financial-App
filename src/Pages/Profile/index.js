import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { Form, Col, FormGroup, FormLabel, FormControl, FormText, Button, Spinner } from 'react-bootstrap'
import { RiSettings2Fill } from 'react-icons/ri'
import { GoPerson } from 'react-icons/go'
import { FaUserEdit } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import useAuth from '../../Auth/UseAuth'
import UserService from '../../Services/UserService'

const Profile = () => {
    const auth = useAuth();
    const user= JSON.parse(localStorage.getItem('userInfo'));

    const [edit, setEdit] = useState(false);
    const [updateFeedback, setUpdateFeedback] = useState('');
    const [isDisabled, setIsDisabled]= useState(0);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        position: '',
        email: '',
        address: '',
        phone: ''
    });

    const [formFeedback, setFormFeedback] = useState({
        firstname: '',
        lastname: '',
        position: '',
        email: '',
        address: '',
        phone: ''
    });

    useEffect(()=>{document.title= 'MrKtLine Profile'})
    
    const validation = () =>{
        const data= {...formData};
        let validate= 0;
        for (var key in data){
            if (data[key] === auth[key]){
                setFormFeedback({...formFeedback, [key]:`Enter a new ${key} (Or if you do not wish to update ${key}, leave this field empty)` })
                validate++;
            }
        }
        if (validate===0){
            return true;
        }
        else{
            return false;
        }
    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setUpdateFeedback('');
        setFormFeedback({
            firstname: '',
            lastname: '',
            position: '',
            email: '',
            address: '',
            phone: ''
        });
        setIsDisabled(1);
        if(validation()){
         const response= await UserService.update({...formData, id: auth._id});  
         if(!response.ok){
             setIsDisabled(0);
             setUpdateFeedback(response.message || response.error);
             throw new Error(response.message);
         }
         else{
             setIsDisabled(0);
             setEdit(false);
             setFormData({
                firstname: '',
                lastname: '',
                position: '',
                email: '',
                address: '',
                phone: ''})
             setUpdateFeedback('update successful!');
             const response= await UserService.get({username: auth.username});
             if(!response.ok){
                 auth.signOut();
             }
             else{
             auth.updateUser(await response.json())
             }
         }
        }
        else{setIsDisabled(0);}
    }

    return (
        <>
            <div className={styles.profile_wrapper}>
                <Col className='p-0 m-0'>
                    <div className={styles.form_container}>
                        <Form onSubmit={(e)=>handleSubmit(e)}>
                            <div className={styles.profile_icon_container}>
                                <GoPerson className={styles.icon}/> Profile
                                <hr/>
                                <button disabled={edit? true: false} 
                                onClick={()=>{setEdit(!edit); setUpdateFeedback('')}} 
                                className={edit? styles.edit_icon_disabled: styles.icon_button }>
                                    Edit <FaUserEdit className={styles.icon} /></button>{' | '}
                                <LinkContainer to='/settingsPage'><button className={styles.icon_button}>Settings <RiSettings2Fill className={styles.icon}/></button></LinkContainer>
                            </div>
                            <FormGroup className='mb-3' controlId='firstname'>
                                {edit?
                                <>
                                <FormLabel>First Name: </FormLabel>
                                <FormControl name='firstname' onChange={(e)=>{handleChange(e)}} type='text' placeholder={user.firstname} disabled={isDisabled}/>
                                <FormText className='text-danger'>{formFeedback?.firstname}</FormText>
                                </>:<FormText>First Name: {user.firstname}</FormText>}
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='lastName'>
                                {edit?
                                <>
                                <FormLabel>Last Name: </FormLabel>
                                <FormControl name='lastname' onChange={(e)=>{handleChange(e)}} type='text' placeholder={user.lastname} disabled={isDisabled}/>
                                <FormText className='text-danger'>{formFeedback?.lastname}</FormText>
                                </>:<FormText>Last Name: {user.lastname}</FormText>}
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='positionFiled'>
                                {edit?
                                <>
                                <FormLabel>Position: </FormLabel>
                                <FormControl name='position' onChange={(e)=>{handleChange(e)}} type='text' placeholder={user.position?user.position:'e.g. CFO, CTO, CEO..'} disabled={isDisabled}/>
                                <FormText className='text-danger'>{formFeedback?.position}</FormText>
                                </>:<FormText>Position: {user.position?user.position:'None'}</FormText>}
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='statusField'>
                                {edit?
                                <>
                                <FormLabel>Status:</FormLabel>
                                <FormControl type='text' placeholder={user.status? user.status: 'e.g. user | admin'} disabled/>
                                <FormText>Only admin can edit this field</FormText>
                                </>:<FormText>Status: {user.status}</FormText>}
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='emailFiled'>
                                {edit?
                                <>
                                <FormLabel>Email: </FormLabel>
                                <FormControl name='email' onChange={(e)=>{handleChange(e)}} type='email' placeholder={user.email? user.email: 'e.g. sample@email.com'} disabled={isDisabled}/>
                                <FormText className='text-danger'>{formFeedback?.email}</FormText>
                                </>:<FormText>Email: {user.email? user.email: 'None'}</FormText>}
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='addressFiled'>
                                {edit?
                                <>
                                <FormLabel>Address: </FormLabel>
                                <FormControl name='address' onChange={(e)=>{handleChange(e)}} type='address' placeholder={user.address? user.address:'123 street, city, ST, USA'} disabled={isDisabled}/>
                                <FormText className='text-danger'>{formFeedback?.address}</FormText>
                                </>:<FormText>Address: {user.address? user.address: 'None'}</FormText>}
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='phoneFiled'>
                                {edit?
                                <>
                                <FormLabel>Phone: </FormLabel>
                                <FormControl name='phone' onChange={(e)=>{handleChange(e)}} type='number' placeholder={user.phone? user.phone: '000-000-0000'} disabled={isDisabled}/>
                                <FormText className='text-danger'>{formFeedback?.phone}</FormText>
                                </>:<FormText>Phone #: {user.phone? user.phone: 'None'}</FormText>}
                            </FormGroup>
                            {edit? <>
                            <Button className='shadow-none' type='submit' disabled={isDisabled}>{isDisabled?
                                            <Spinner as='span' animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"/>:'Submit'}</Button> {' '}
                            <Button className='shadow-none' onClick={()=>{setEdit(!edit)}} disabled={isDisabled}>Cancel</Button>
                            </>: null}
                            <FormText className={updateFeedback==='update successful!'? 'text-success':'text-danger'}>{updateFeedback}</FormText>
                        </Form>
                    </div>
                </Col>            
            </div>
        </>
    )
}

export default Profile
