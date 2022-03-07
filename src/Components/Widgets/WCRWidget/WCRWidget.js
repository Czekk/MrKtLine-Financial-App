import React from 'react'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Line} from 'react-chartjs-2'
import {data, options} from '../../../DisplayOptionsForCharts/WCRData/DataForLineChart'
import styles from './WCRWidget.module.css'
import Button from '../../Button/Button'
import DataContext from '../../../Context/DataContext'
import { labels } from '../../../DisplayOptionsForCharts/Labels/labels.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const WCRWidget = () => {
    return (
        <DataContext.Consumer>
        {context=>(<>
            <div className={styles.card_wrapper}>
                <Line data={{...data, datasets:[ {...data.datasets[0], data: context.wcr}], labels: labels[context.period] }} options={options} />
                <LinkContainer to='/wcrPage'><NavLink><Button/></NavLink></LinkContainer>
            </div>  
        </>)}
        
        </DataContext.Consumer>
    )
}

export default WCRWidget
