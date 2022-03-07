import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import { NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {data, options} from '../../../DisplayOptionsForCharts/RoEData/DataForBarChart'
import styles from './RoEWidget.module.css'
import Button from '../../Button/Button'
import DataContext from '../../../Context/DataContext'
import { labels } from '../../../DisplayOptionsForCharts/Labels/labels.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)
const RoEWidget = () => {
    return (
        <DataContext.Consumer>
            {context=>(<>
           <div className={styles.card_wrapper}>
                <Bar options={options} data={{...data, datasets:[ {...data.datasets[0], data: context.roe}], labels: labels[context.period]  }} />
                <LinkContainer to='/roePage'><NavLink><Button/></NavLink></LinkContainer>
            </div> 
        </>)}
        
        </DataContext.Consumer>
    )
}

export default RoEWidget
