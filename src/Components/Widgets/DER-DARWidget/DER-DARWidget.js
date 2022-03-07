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
import {Line} from 'react-chartjs-2'
import {data, options} from '../../../DisplayOptionsForCharts/DER-DARData/derdar-multiline.js'
import styles from './DER-DARWidget.module.css'
import Button from '../../Button/Button.js'
import { LinkContainer } from 'react-router-bootstrap'
import {NavLink} from 'react-bootstrap'
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
);
const DERDARWidget = () => {
    return (
        <DataContext.Consumer>
            {context=>(<>
            <div className={styles.card_wrapper}>
                <Line data={{...data, datasets:[ {...data.datasets[0], data: context.der}, {...data.datasets[1], data: context.dar}], labels: labels[context.period] }} options={options}/>
                <LinkContainer to='/derdarPage'><NavLink ><Button/></NavLink></LinkContainer>
            </div>
        </>)}
        
        </DataContext.Consumer>
    )
}

export default DERDARWidget
