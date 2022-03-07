import React, { useEffect } from 'react'
import styles from './WCR.module.css'
import ConfigBar from '../../Components/ConfigBar'
import {Table, Col} from 'react-bootstrap'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Chart } from 'react-chartjs-2'
import { data } from '../../DisplayOptionsForCharts/WCRData/DataForMultiTypeChart'
import DataContext from '../../Context/DataContext'
import {labels} from '../../DisplayOptionsForCharts/Labels/labels'

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
)

const WCR = () => {
    useEffect(()=>{document.title= 'MrKtLine Working Capital Ratio'})
    return (
        <DataContext.Consumer>
        {context=>(<>
           <div className={styles.wcr_wrapper}>
            <Col className='p-0 m-0'>
                <ConfigBar/>
                <div className={styles.wcr_container}>
                    <div className={styles.wcr_chart}>
                        <Chart tyop='bar' data={{...data, datasets:[ 
                            {...data.datasets[0], data: context.currentAssets},
                            {...data.datasets[1], data: context.curentLiability},
                            {...data.datasets[2], data: context.wcr}
                            ], labels: labels[context.period]  }} />
                    </div>
                    <div className={styles.wcr_data_table}>
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
                                   <td>Cur. Assets-M</td>
                                   {context.currentAssets.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                               <td>Cur. Liability-M</td>
                                   {context.curentLiability.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                                    <td>WCR - index</td>
                                    {context.wcr.map((i, index)=>{return <td key={index}>{i}</td>})}
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

export default WCR
