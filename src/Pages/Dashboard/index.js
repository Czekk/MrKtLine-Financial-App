import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import styles from './Dashboard.module.css';
import {RevenueWidget } from '../../Components/Widgets/RevenueWidget/RevenueWidget';
import RoAWidget from '../../Components/Widgets/RoAWidget/RoAWidget';
import RoEWidget from '../../Components/Widgets/RoEWidget/RoEWidget';
import WCRWidget from '../../Components/Widgets/WCRWidget/WCRWidget';
import DERDARWidget from '../../Components/Widgets/DER-DARWidget/DER-DARWidget';
import ConfigBar from '../../Components/ConfigBar';

const Dashboard = () => {
    useEffect(()=>{document.title= 'MrKtLine Dashboard'})

    return (
        <>
        <div className={styles.dashboard_wrapper}>
          <Col className='p-0 m-0'>
              <ConfigBar/>
            <div className={styles.widgets_container}>
                <div className={styles.widget_wrapper_1}>
                    <RevenueWidget/>                    
                </div>
                <div className={styles.widget_wrapper_2}>
                    <RoAWidget/>
                </div>
                <div className={styles.widget_wrapper_3}>
                    <RoEWidget/>
                </div>
                <div className={styles.widget_wrapper_4}>
                <WCRWidget/>
                </div>
                <div className={styles.widget_wrapper_5}>
                    <DERDARWidget/>
                </div>
            </div>
          </Col> 
          </div> 
        </>
    )
}

export default Dashboard
