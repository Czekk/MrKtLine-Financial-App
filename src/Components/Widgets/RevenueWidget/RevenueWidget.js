import React from 'react'
import { NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styles from './RevenueWidget.module.css'
import { data, options } from '../../../DisplayOptionsForCharts/RevenueData/revenue-doughnut'
import { Doughnut } from 'react-chartjs-2'
import {Chart as chartjs, ArcElement, Tooltip, Legend} from 'chart.js';
import Button from '../../Button/Button'
import DataContext from '../../../Context/DataContext'

chartjs.register(ArcElement, Tooltip, Legend);

export const RevenueWidget = (probs) => {
    return (
        <DataContext.Consumer>
            {context=>(<>
        <div className={styles.Card_wrapper}> 
            <Doughnut 
                data={ {...data, datasets:[ {...data.datasets[0], data: context.revenue.percentage}]}}
                options={options}
            />
            <div className={styles.footer_wrapper}>
                <span className={styles.footer_text}>
                Hover for %        
                </span>
                <span className={styles.button_wrapper}>
                <LinkContainer to='/revenuePage'><NavLink><Button/></NavLink></LinkContainer>
                </span>
            </div> 
        </div>
        </>)}
        
        </DataContext.Consumer>
         
    )
}

