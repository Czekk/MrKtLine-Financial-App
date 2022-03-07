import React, { useEffect } from 'react'
import styles from './RoA.module.css'
import ConfigBar from '../../Components/ConfigBar'
import {Table, Col} from 'react-bootstrap'

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
import { options, data } from '../../DisplayOptionsForCharts/RoAData/roa-multiline'
import { labels} from '../../DisplayOptionsForCharts/Labels/labels'

import {Line} from 'react-chartjs-2'
import DataContext from '../../Context/DataContext'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RoA = () => {
    useEffect(()=>{document.title= 'MrKtLine Return On Asset'})
    return (
        <DataContext.Consumer>
            {context=>(<>
           <div className={styles.roa_wrapper}>
            <Col className='p-0 m-0'>
                <ConfigBar/>
                <div className={styles.roa_container}>
                    <div className={styles.roa_chart}>
                        <Line options={options} data={{...data, datasets:[ 
                            {...data.datasets[0], data: context.netIncome},
                            {...data.datasets[1], data: context.totalAssets},
                            {...data.datasets[2], data: context.roa}
                            ], labels: labels[context.period]  }}/>
                    </div>
                    <div className={styles.roa_data_table}>
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
                               <td>Tot. Assets-M</td>
                                   {context.totalAssets.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                                    <td>RoA Index</td>
                                    {context.roa.map((i, index)=>{return <td key={index}>{i}</td>})}
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

export default RoA
