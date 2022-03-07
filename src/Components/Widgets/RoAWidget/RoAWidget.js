import React from 'react'
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-bootstrap'
import {Line} from 'react-chartjs-2'
import {data, options} from '../../../DisplayOptionsForCharts/RoAData/roa-line.js'
import styles from './RoAWidget.module.css'
import Button from '../../Button/Button.js'
import DataContext from '../../../Context/DataContext'
import { labels } from '../../../DisplayOptionsForCharts/Labels/labels.js'

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RoAWidget = () => {
    return (
        <DataContext.Consumer>
            {context=>(<>
            <div className={styles.card_wrapper}>
                <Line options={options} data={{...data, datasets:[ {...data.datasets[0], data: context.roa}], labels: labels[context.period] }} />
                <LinkContainer to='/roaPage'><NavLink><Button/></NavLink></LinkContainer>
            </div>  
        </>)}
        
        </DataContext.Consumer>
    )
}

export default RoAWidget
