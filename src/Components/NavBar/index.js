import React, { useState } from 'react'
import { Button,Dropdown, Nav, NavLink, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import {AiOutlineStock} from 'react-icons/ai'
import {IoIosLogOut, IoIosSettings} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {FiMenu} from 'react-icons/fi'
import styles from './NavBar.module.css'
import {AiOutlineDashboard} from 'react-icons/ai'
import {BsCashCoin} from 'react-icons/bs'
import {RiExchangeDollarLine, RiCalculatorLine, RiScales3Line} from 'react-icons/ri'
import {GoGraph} from 'react-icons/go'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../Auth/UseAuth'
import logo from '../../Images/stocks.gif'



const NavBar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const signOut = ()=> {
        auth.signOut();
        navigate('logIn');
    }
    return (
        <>
        <div className={styles.navbar_container}>
            
                <div className={styles.navbar_inner_container}>
                    {/* NavBar  */}
                    <div className= {styles.logo}>
                        <span>
                        {/* <AiOutlineStock  className= {styles.logo_Icon}/> */}
                        <img src={logo}  className= {styles.logo_Icon} alt='logo'/>{' '}
                         MrKtLine Financial Corp
                        </span>                    
                    </div>
                    {auth.isLoggedIn?
                    <>
                        <div className={styles.NavBar_Options}>
                            
                            <LinkContainer to='profilePage' eventKey='profilePage'><NavLink href='#' className={styles.nav_Icons} ><CgProfile className={styles.icon}/> Profile</NavLink></LinkContainer>
                            <LinkContainer to='settingsPage' eventKey='settingsPage'><NavLink href='#' className={styles.nav_Icons} ><IoIosSettings className={styles.icon}/> Settings</NavLink></LinkContainer>
                            <Dropdown size='sm'>
                                <DropdownToggle variant='primary' id='dropdown-basic'>
                                    Hi! {' '+ auth.firstname}
                                </DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem onClick={signOut}><IoIosLogOut className={styles.icon}/> Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                    
                        </div>
                        <div onClick={handleShow} className={styles.burgerIcon}><i className={styles.burgerIcon_Icon}><FiMenu/></i></div>
                    </>:null}
                    
                {/* offCanvas */}
                <Offcanvas onClick={handleClose} show={show} onHide={handleClose} className='justify-content-center' gap={5}>
                    <OffcanvasHeader closeButton >
                        <OffcanvasTitle><AiOutlineStock/> MrKtLine Financial Corp</OffcanvasTitle>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <Nav variant='pills' className= {styles.sidebar_menu_wrapper}>
                            <LinkContainer to='/'>
                                <NavLink className='p-2 m-2' eventKey='/'>
                                    <div className={styles.menu_text}>Dashboard <AiOutlineDashboard className= {styles.menu_icon}/>
                                    </div>
                                </NavLink>
                            </LinkContainer>
                            <LinkContainer to='revenuePage'><NavLink className='p-2 m-2' eventKey='revenuePage'><div className={styles.menu_text}>Revenue <BsCashCoin className= {styles.menu_icon}/></div></NavLink></LinkContainer>
                            <LinkContainer to='roaPage'><NavLink className='p-2 m-2' eventKey='roaPage'><div className={styles.menu_text}>RoA <RiExchangeDollarLine className= {styles.menu_icon}/></div></NavLink></LinkContainer>
                            <LinkContainer to='roePage'><NavLink className='p-2 m-2' eventKey='roePage'><div className={styles.menu_text}>RoE <GoGraph className= {styles.menu_icon}/></div></NavLink></LinkContainer>
                            <LinkContainer to='wcrPage'><NavLink className='p-2 m-2' eventKey='wcrPage'><div className={styles.menu_text}>WCR <RiCalculatorLine className= {styles.menu_icon}/></div></NavLink></LinkContainer>
                            <LinkContainer to='derdarPage'><NavLink className='p-2 m-2' eventKey='derdarPage'><div className={styles.menu_text}>DER <RiScales3Line className= {styles.menu_icon}/></div></NavLink></LinkContainer>
                            <hr/>
                            <LinkContainer to='profilePage'><NavLink className='p-2 m-1' eventKey='profilePage'><div className={styles.menu_text}><CgProfile/> Profile</div></NavLink></LinkContainer>
                            <LinkContainer to='settingsPage'><NavLink className='p-2 m-1' eventKey='settingsPage'><div className={styles.menu_text}><IoIosSettings/> Settings</div></NavLink></LinkContainer>
                            <p variant='primary'>Logged in as: {auth.firstName}</p>
                            <Button variant='primary' onClick={signOut}><IoIosLogOut/> Logout</Button>
                        </Nav>
                        
                    </OffcanvasBody>
                </Offcanvas>
                </div>
            
        </div>
        </>
    )
}

export default NavBar
