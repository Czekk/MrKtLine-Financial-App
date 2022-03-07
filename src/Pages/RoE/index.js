import React, { useEffect } from 'react'
import styles from './RoE.module.css'
import { Col, Table } from 'react-bootstrap'
import ConfigBar from '../../Components/ConfigBar'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js'

import { Radar } from 'react-chartjs-2'
import { data} from '../../DisplayOptionsForCharts/RoEData/DataForRadarChart'
import DataContext from '../../Context/DataContext'
import {labels} from '../../DisplayOptionsForCharts/Labels/labels'

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

const RoE = () => {
    useEffect(()=>{document.title= 'MrKtLine Return On Equity'})
    return (
        <DataContext.Consumer>
       {context=>( <>
            <div className={styles.roe_wrapper}>
            <Col className='p-0 m-0'>
                <ConfigBar/>
                <div className={styles.roe_container}>
                    <div className={styles.roe_chart}>
                        <Radar data={{...data, datasets:[ 
                            {...data.datasets[0], data: context.netIncome},
                            {...data.datasets[1], data: context.shareholdersEquity},
                            {...data.datasets[2], data: context.roe}
                            ], labels: labels[context.period]  }} />
                    </div>
                    <div className={styles.roe_data_table}>
                        <Table striped hover responsive size='sm' className='m-0'>
                            <thead>
                                <tr>
                                    <th>{(context.period==='YTD' && 'Months')
                                        || (context.period==='QTD' && 'Quarters')
                                        || (context.period==='MTD' && 'Date')
                                        || (context.period==='WTD' && 'Days')}
                                    </th>
                                    {labels[context.period].map((i, index)=>{return <th key={index}>{i}</th>})}
                                </tr>
                            </thead>
                            <tbody>
                               <tr>
                                   <td>Net Income-M</td>
                                   {context.netIncome.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                               <td>S.holder's Equ-M</td>
                                   {context.shareholdersEquity.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                                    <td>RoE %</td>
                                    {context.roe.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Col>
        </div>                 
        </>)}
        </DataContext.Consumer>
    )
}

export default RoE
