import React,{useState} from 'react'
import Dashboard from '../Pages/Dashboard'
import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar'
import styles from './Layout.module.css'
import { Routes,Route,Navigate } from 'react-router-dom'
import Revenue from '../Pages/Revenue'
import RoA from '../Pages/RoA'
import WCR from '../Pages/WCR'
import RoE from '../Pages/RoE'
import DERDAR from '../Pages/DER - DAR'
import Profile from '../Pages/Profile'
import Settings from '../Pages/Settings'
import LogIn from '../Pages/LogIn'
import Register from '../Pages/Register'
import NotFound from '../Pages/NotFound'
import useAuth from '../Auth/UseAuth'
import RequireAuth from '../Auth/RequireAuth'

const Home = (probs) => {
    const [toggle, setToggle] = useState(true);
    const auth = useAuth();

    const toggleHandle =()=>{
        setToggle(!toggle);
    }
    return (
        <>
        <div className={styles.page_wrapper}>
            <div className={styles.navbar_wrapper}>
                <NavBar />
            </div>
            
            <div className={styles.body_wrapper} >
                {auth.isLoggedIn?
                <div className={styles.sidebar_wrapper}>
                    <SideBar toggle= {toggle} toggleHandle={toggleHandle} />
                </div>:null}
                
                <div className={styles.main_wrapper}>
                    <Routes>
                        <Route path='/' exact element={<RequireAuth><Dashboard/></RequireAuth>}/>
                        <Route path='revenuePage' exact element={<RequireAuth><Revenue/></RequireAuth>}/>
                        <Route path='roaPage' exact element={<RequireAuth><RoA/></RequireAuth>}/>
                        <Route path='wcrPage' exact element={<RequireAuth><WCR/></RequireAuth>}/>
                        <Route path='roePage' exact element={<RequireAuth><RoE/></RequireAuth>}/>
                        <Route path='derdarPage' exact element={<RequireAuth><DERDAR/></RequireAuth>}/>
                        <Route path='profilePage' exact element={<RequireAuth><Profile/></RequireAuth>}/>
                        <Route path='settingsPage' exact element={<RequireAuth><Settings/></RequireAuth>}/>
                        <Route path='logIn' exact element={auth?.isLoggedIn?<Navigate to='/' replace={true}/>:<LogIn/>}/>
                        <Route path='register' exact element={<Register/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                    <p>{probs.error}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home
