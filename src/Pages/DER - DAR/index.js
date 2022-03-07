import React, { useEffect } from 'react'
import styles from './DER-DAR.module.css'
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
} from 'chart.js'
import {Chart} from 'react-chartjs-2'
import ConfigBar from '../../Components/ConfigBar'
import { Col, Table } from 'react-bootstrap'
import { data, options } from '../../DisplayOptionsForCharts/DER-DARData/derdar-multitype'
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

const DERDAR = () => {
    useEffect(()=>{document.title= 'MrKtLine DER - DAR'})
    return (
        <DataContext.Consumer>
        {context=>(<>
           <div className={styles.derdar_wrapper}>
            <Col className='p-0 m-0'>
                <ConfigBar/>
                <div className={styles.derdar_container}>
                    <div className={styles.derdar_chart}>
                        <Chart options={options} data={{...data, datasets:[ 
                            {...data.datasets[0], data: context.totalDebt},
                            {...data.datasets[1], data: context.totalEquity},
                            {...data.datasets[2], data: context.totalAssets},
                            {...data.datasets[3], data: context.der},
                            {...data.datasets[4], data: context.dar}
                            ], labels: labels[context.period]  }}/>
                    </div>
                    <div className={styles.derdar_data_table}>
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
                                   <td>Tot. Debt-M</td>
                                   {context.totalDebt.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                               <td>Tot. Equity-M</td>
                                   {context.totalEquity.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                                    <td>Tot. Asset-M</td>
                                    {context.totalAssets.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                                    <td>DER-%</td>
                                    {context.der.map((i, index)=>{return <td key={index}>{i}</td>})}
                               </tr>
                               <tr>
                                    <td>DAR-%</td>
                                    {context.dar.map((i, index)=>{return <td key={index}>{i}</td>})}
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

export default DERDAR
