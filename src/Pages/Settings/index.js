import React, { useEffect, useState } from 'react'
import styles from './settings.module.css'
import { Form, Col, FormGroup, FormLabel, FormControl, Button, InputGroup, FormCheck, ButtonGroup, FormText, Spinner } from 'react-bootstrap'
import { RiSettings2Fill } from 'react-icons/ri'
import useAuth from '../../Auth/UseAuth'
import UserService from '../../Services/UserService'
import useControl from '../../Context/UseControl'


const Settings = () => {
    const auth = useAuth();
    const control= useControl();
    const [changeButton, setChangeButton]= useState({
        usernameBtn: true,
        passwordBtn: true
    });
    const [usernameFeedback, setUsernameFeedback]= useState('');
    const [passwordFeedback, setPasswordFeedback]= useState('');
    const [quickPointsFeedback, setQuickPointsFeedback]= useState('');
    const [defaultPeriodFeedback, setDefaultPeriodFeedback]= useState('');
    const [deleteFeedback, setDeleteFeedback] = useState('');

    useEffect(()=>{document.title= 'MrKtLine Setting'})
    const [formData, setFormData]= useState({
        username: null,
        password: null,
        showQuickPoints: null,
        defaultPeriod: null
    });

    const [usernameLoading, setUsernameLoading] = useState(0);
    const [passwordLoading, setPasswordLoading] = useState(0);
    const [quickPointsLoading, setQuickPointsLoading] = useState(0);
    const [defaultPeriodLoading, setDefaultPeriodLoading] = useState(0);
    const [isDisabled, setIsDisabled] = useState(0);
    const [isConfirm, setIsConfirm] = useState(0);

    const handleChangeButton= async (e)=>{
        setUsernameLoading(1);
        setIsDisabled(1);
        setUsernameFeedback('')
        if (changeButton[e.target.name]){
            setChangeButton({...changeButton,
                [e.target.name]: !changeButton[e.target.name]
            });
        }
        else{
            const userFound = await UserService.get({username: formData.username})
            if(formData.username === auth.username || !formData.username || userFound.ok ){
                setUsernameFeedback('Username invalid or taken');
                setUsernameLoading(0);
                setIsDisabled(0);
            }
            else{

            
                const userData= {...formData, id: auth._id};
                const response= await UserService.update(userData);
                if(!response.ok){
                    setUsernameLoading(0);
                    setIsDisabled(0);
                    const error= response.error;
                    setUsernameFeedback(error)
                    setTimeout(()=>{setUsernameFeedback('')},10000);
                    throw new Error(error)
                }
                else{
                    setUsernameFeedback('update successful!');
                    const response= await UserService.get(formData);
                    auth.updateUser(await response.json());
                    setChangeButton({...changeButton,
                        [e.target.name]: !changeButton[e.target.name]
                    });
                    setFormData({});
                    setUsernameLoading(0);
                    setIsDisabled(0);
                }
            }
        }
        setUsernameLoading(0);
        setIsDisabled(0);
    }

    const handlePasswordChange=async ()=>{
        setPasswordLoading(1);
        setIsDisabled(1);
        setPasswordFeedback('')
        if (formData.newPassword && formData.confirmPassword){
            if(formData.newPassword === formData.confirmPassword){
                const userData= {password: formData.newPassword, id:auth._id};
                const response= await UserService.update(userData);
                if(!response.ok){
                    setPasswordFeedback(await response.json().message);
                    throw new Error('something went wrong!')
                }
                else{
                    setPasswordFeedback('update successful!');
                    const response = await UserService.get({username:auth.username});
                    if(!response.ok){
                        setPasswordFeedback(await response.json().message);
                    }
                   else{
                    auth.updateUser(await response.json());
                    setChangeButton({...changeButton, 
                        passwordBtn: !changeButton.passwordBtn})
                    setFormData({})
                   } 
                }
            }
            else{
                setPasswordFeedback('Passwords do not match!')
            }
        }
        else{
            setPasswordFeedback('please fill missing fields')
        }
        setPasswordLoading(0);
        setIsDisabled(0);
    }

    const handleShowQuickPointsChange= async (e)=>{
        setQuickPointsFeedback('');
        setQuickPointsLoading(1);
        setIsDisabled(1);
        const preference= {preference:{showQuickPoints: !auth.preference.showQuickPoints, defaultPeriod: auth.preference.defaultPeriod}, id: auth._id }
        const response = await UserService.update(preference);
        
        if (!response.ok){
            setQuickPointsFeedback(await response.json().message);
            throw new Error('update failed')
        }
        else{
            setQuickPointsFeedback('update successful!');
            const response = await UserService.get({username:auth.username});
            if(!response.ok){
                setQuickPointsFeedback('could not retrieve user Info!');
            }
           else{
            auth.updateUser(await response.json());
           } 
        }
        setQuickPointsLoading(0);
        setIsDisabled(0);
    }

    const handleDefaultPeriod=async (period)=>{
        setQuickPointsFeedback('')
        setDefaultPeriodLoading(1);
        setIsDisabled(1);
        const preference= {preference:{defaultPeriod: period, showQuickPoints: auth.preference.showQuickPoints}, id: auth._id};
        const response= await UserService.update(preference);

        if(!response.ok){
            setDefaultPeriodFeedback(await response.json().message);
            setDefaultPeriodLoading(0);
            setIsDisabled(0);
            throw new Error(response.json().message);
        }
        else{
            setDefaultPeriodFeedback('update successful!');
            const response= await UserService.get({username: auth.username});
            if(!response.ok){
                setDefaultPeriodFeedback(await response.json().message);
            }
            else{
                auth.updateUser(await response.json());
                control.currentPeriodHandler(period)
            }
            setDefaultPeriodLoading(0);
            setIsDisabled(0);
        }
    }

    const handleOnChange=(e)=>{
     setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleDeletionConfirm= ()=>{
        setIsConfirm(!isConfirm);
    };

    const handleDeletion= async ()=>{
        const response = await UserService.delete(auth._id);

        if (!response.ok){
            setDeleteFeedback('Something went wrong! Deletion failed!');
            setIsConfirm(0);
            throw new Error('Deletion failed!');
        }
        else{
            setDeleteFeedback('Account Deleted!');
            control.deleted=true;
            auth.signOut()
        }
    }
    
    return (
        <>
            <div className={styles.settings_wrapper}>
                <Col className='p-0 m-0'>
                    <div className={styles.form_container}>
                        <Form >
                            <div className={styles.settings_icon_container}>
                                <RiSettings2Fill className={styles.icon}/> Settings
                                <hr/>
                            </div>
                            <FormLabel className='m-0'>Account </FormLabel>
                            <hr/>
                            <FormGroup className='mb-5' controlId='usernameField'>
                                <FormLabel>User Name: </FormLabel>
                                <InputGroup>
                                    <FormControl name='username' onChange={handleOnChange} type='text' placeholder={changeButton.usernameBtn?auth.username:'Enter new username'} disabled={changeButton.usernameBtn}/>
                                    <Button name='usernameBtn' onClick= {handleChangeButton} size='sm'  className='float-end shadow-none' disabled={isDisabled}>
                                        {usernameLoading?<Spinner as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"/> :changeButton.usernameBtn?'Change': 'Save'}</Button>
                                            {changeButton.usernameBtn? null: <Button className='shadow-none'  size='sm' onClick={()=>{setChangeButton({...changeButton, usernameBtn: true}); setUsernameFeedback('');}} disabled = {isDisabled}>Cancel</Button>}
                                </InputGroup>
                                <FormText className={usernameFeedback === 'update successful!'? 'text-success': 'text-danger'}>{usernameFeedback}</FormText>
                            </FormGroup>
                            {changeButton.passwordBtn?
                            <FormGroup className='mb-5 ' controlId='passwordField'>
                                <FormLabel>Password: </FormLabel>
                                <InputGroup>
                                <FormControl name='password'  type='password' value='passsword' disabled={changeButton.passwordBtn}/>
                                    <Button name='passwordBtn' onClick={()=>{setChangeButton({...changeButton, passwordBtn:false})}} size='sm' className='float-end shadow-none' disabled={isDisabled}>{changeButton.passwordBtn?'Change': 'Save'}</Button>
                                </InputGroup>
                            </FormGroup>:
                            <>
                            <FormGroup className='mb-3' controlId='newPasswordField'>
                                <FormLabel>New Password: </FormLabel>
                                    <FormControl name='newPassword'  onChange={handleOnChange} type='password' placeholder='Enter your new password..' disabled={changeButton.passwordBtn}/>
                            </FormGroup>
                            <FormGroup className='mb-5 ' controlId='confirmPasswordField'>
                            <FormLabel>Confirm Password: </FormLabel>
                            <FormControl name='confirmPassword'  onChange={handleOnChange} type='password' placeholder='Re-enter your new password..' disabled={changeButton.passwordBtn}/>
                            <Button name='passwordBtn' onClick= {(e)=>handlePasswordChange(e)} size='sm' className='float-start mt-1 shadow-none' disabled={isDisabled}>{passwordLoading?
                            <Spinner as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"/>:changeButton.passwordBtn?'Change': 'Save'}</Button>
                            <Button name='cancel' onClick= {()=>{setChangeButton({...changeButton ,passwordBtn:true})}} size='sm' className='float-start m-1 shadow-none' disabled={isDisabled}>Cancel</Button>
                            <FormText className={passwordFeedback === 'update successful!'? 'text-success': 'text-danger'}>{passwordFeedback}</FormText>
                        </FormGroup>
                    </>}
                            <hr/>
                            <FormLabel className='m-0'>Preference</FormLabel>
                            <hr/>
                            <FormGroup className='mb-3' controlId='quickPointsField'>
                                <InputGroup>
                                    <FormCheck className='shadow-none' name= 'showQuickPoints' onChange={(e)=>{handleShowQuickPointsChange(e)}} value={auth.preference.showQuickPoints} checked={auth.preference.showQuickPoints} type='checkbox' label='Show Quick Points' disabled={isDisabled}/>
                                </InputGroup>
                                {quickPointsLoading?<span> <i>  </i><Spinner size='sm' animation="border" variant='secondary'/></span>:null}
                                <FormText className={quickPointsFeedback === 'update successful!'? 'text-success': 'text-danger'}>{quickPointsFeedback}</FormText>
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='defaultPeriodField'>
                                <InputGroup>
                                <FormLabel className='me-2'>Default Period :</FormLabel> {' '}
                                    <ButtonGroup >
                                        <Button className='shadow-none' onClick={()=>{handleDefaultPeriod('YTD')}} name='YTD' active= {auth.preference.defaultPeriod==='YTD'?true: false} disabled={isDisabled}>YTD</Button>
                                        <Button className='shadow-none' onClick={()=>{handleDefaultPeriod('QTD')}} name='QTD' active= {auth.preference.defaultPeriod==='QTD'?true: false} disabled={isDisabled}>QTD</Button>
                                        <Button className='shadow-none' onClick={()=>{handleDefaultPeriod('MTD')}} name='MTD' active= {auth.preference.defaultPeriod==='MTD'?true: false} disabled={isDisabled}>MTD</Button>
                                        <Button className='shadow-none' onClick={()=>{handleDefaultPeriod('WTD')}}name='WTD' active= {auth.preference.defaultPeriod==='WTD'?true: false} disabled={isDisabled}>WTD</Button>
                                        {defaultPeriodLoading?<span> {' '}<Spinner size='sm' animation="border" variant='secondary'/></span>:null}
                                    </ButtonGroup>
                                </InputGroup>
                                <FormText className={defaultPeriodFeedback === 'update successful!'? 'text-success': 'text-danger'}>{defaultPeriodFeedback}</FormText>
                            </FormGroup>
                            <hr/>
                            {isConfirm?
                            <>
                                <FormLabel className='m-1'>Are you sure you want to delete your account? 
                                (Clicking 'YES, DELETE ACCOUNT' results in losing all your settings)</FormLabel>
                                <Button className='m-2 float-end shadow-none' variant='danger' size='sm' onClick={handleDeletion}>YES, DELETE ACCOUNT</Button>
                                <Button className='m-2 float-end shadow-none' variant='primary' size='sm' onClick={handleDeletionConfirm}>NO</Button>
                            </>:
                            <FormLabel className='m-0'>Account Deletion: 
                                <Button onClick={handleDeletionConfirm} className='m-2 shadow-none' variant='primary' size='sm' disabled={isDisabled}>Delete Account</Button>
                            </FormLabel>
                            } 
                            <hr/>
                            <FormText className={deleteFeedback === 'Account Deleted!'? 'text-success': 'text-danger'}>{deleteFeedback}</FormText>
                        </Form>
                    </div>
                </Col>            
            </div>
        </>
    )
}

export default Settings
