import React from 'react'
import { Nav, NavLink} from 'react-bootstrap'
import style from './SideBar.module.css'
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'
import {AiOutlineDashboard} from 'react-icons/ai'
import {BsCashCoin} from 'react-icons/bs'
import {RiExchangeDollarLine, RiCalculatorLine, RiScales3Line} from 'react-icons/ri'
import {GoGraph} from 'react-icons/go'
import { LinkContainer } from 'react-router-bootstrap'
import ControlContext from '../../Context/ControlContext'

const SideBar = (probs) => {
    

    return (
        <ControlContext.Consumer>
        {context=>(<>
        <div bg='light' className={style.sidebar_container }>
            <div className= {style.toggle_Icon_Container}>
                {probs.toggle?<FaAngleDoubleLeft className= {style.icon} onClick={probs.toggleHandle}/> : <FaAngleDoubleRight className= {style.icon} onClick={probs.toggleHandle}/>
                 }
            </div>
            <Nav variant='pills' className= {style.sidebar_menu_wrapper}>
            <LinkContainer to='/'>
                <NavLink active={context.currentPage==='dashBoard'? true: false} onClick={()=>{context.currentPageHandler('Dashboard')}}>
                    {probs.toggle?<div className={style.menu_text}>Dashboard <AiOutlineDashboard className= {style.menu_icon}/></div>:<AiOutlineDashboard className= {style.menu_icon_strong}/> }
                </NavLink>
            </LinkContainer>
            <LinkContainer to='revenuePage' ><NavLink active={context.currentPage==='revenuePage'? true: false} onClick={()=>{context.currentPageHandler('revenuePage')}}>{probs.toggle?<div className={style.menu_text}>Revenue <BsCashCoin className= {style.menu_icon}/></div>:<BsCashCoin className= {style.menu_icon_strong}/> }</NavLink></LinkContainer>
            <LinkContainer to='roaPage' ><NavLink active={context.currentPage==='roaPage'? true: false} onClick={()=>{context.currentPageHandler('roaPage')}}>{probs.toggle?<div className={style.menu_text}>RoA <RiExchangeDollarLine className= {style.menu_icon}/></div>:<RiExchangeDollarLine className= {style.menu_icon_strong}/> }</NavLink></LinkContainer>
            <LinkContainer to='roePage' ><NavLink active={context.currentPage==='roePage'? true: false} onClick={()=>{context.currentPageHandler('roePage')}}>{probs.toggle?<div className={style.menu_text}>RoE <GoGraph className= {style.menu_icon}/></div>:<GoGraph className= {style.menu_icon_strong}/> }</NavLink></LinkContainer>
            <LinkContainer to='wcrPage' ><NavLink active={context.currentPage==='wcrPage'? true: false} onClick={()=>{context.currentPageHandler('wcrPage')}}>{probs.toggle?<div className={style.menu_text}>WCR <RiCalculatorLine className= {style.menu_icon}/></div>:<RiCalculatorLine className= {style.menu_icon_strong}/> }</NavLink></LinkContainer>
            <LinkContainer to='derdarPage' ><NavLink active={context.currentPage==='derdarPage'? false: false} onClick={()=>{context.currentPageHandler('derdarPage')}}>{probs.toggle?<div className={style.menu_text}>DER - DAR <RiScales3Line className= {style.menu_icon}/></div>:<RiScales3Line className= {style.menu_icon_strong}/> }</NavLink></LinkContainer>

            </Nav>
        </div>
        </>)}
        </ControlContext.Consumer>
    )
}

export default SideBar
