import React, { useEffect } from 'react'
import { Col, Table } from 'react-bootstrap'
import ConfigBar from '../../Components/ConfigBar'
import styles from './Revenue.module.css'
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
import {data, options} from '../../DisplayOptionsForCharts/RevenueData/revenue-stackedbar.js'
import { sectors, regions } from '../../DisplayOptionsForCharts/RevenueData/DataForTable'
import DataContext from '../../Context/DataContext'
import { labels } from '../../DisplayOptionsForCharts/Labels/labels'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    )

const Revenue = () => {
    useEffect(()=>{document.title= 'MrKtLine Revenue'})
    return (
        <DataContext.Consumer>
            {context=> (<>
        <div className={styles.revenue_wrapper}>
            <Col className='p-0 m-0'>
                <ConfigBar/>
                <div className={styles.revenue_container}>
                    <div className={styles.revenue_chart}>
                        <Bar options={options} data={{...data, datasets:[ 
                            {...data.datasets[0], data: context.revenue.interest},
                            {...data.datasets[1], data: context.revenue.serviceCharge},
                            {...data.datasets[2], data: context.revenue.capitalMarkets},
                            {...data.datasets[3], data: context.revenue.mortgage},
                            {...data.datasets[4], data: context.revenue.fees},
                            {...data.datasets[5], data: context.revenue.other},
                    ], labels: labels[context.period]  }}/>
                    </div>
                    <div className={styles.revenue_data_table}>
                        <Table striped hover responsive size='sm' className='m-0'>
                            <thead> 
                                <tr>
                                    <th>Reigions</th>
                                    {sectors.map((i, index)=>{return <th key={index}>{i} {'(M)'}</th>})}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{regions[0]}</td>
                                   {context.revenue.regional.northEast.map((i, index)=>{
                                       return <td key={index}>{i}</td>
                                   })} 
                                </tr>
                                <tr>
                                    <td>{regions[1]}</td>
                                    {context.revenue.regional.atlantic.map((i, index)=>{
                                      return <td key={index}>{i}</td>
                                   })} 
                                </tr>
                                <tr>
                                    <td>{regions[2]}</td>
                                    {context.revenue.regional.south.map((i, index)=>{
                                       return <td key={index}>{i}</td>
                                   })} 
                                </tr>
                                <tr>
                                    <td>{regions[3]}</td>
                                    {context.revenue.regional.southWest.map((i, index)=>{
                                       return <td key={index}>{i}</td>
                                   })} 
                                </tr>
                                <tr>
                                    <td>{regions[4]}</td>
                                    {context.revenue.regional.pacific.map((i, index)=>{
                                       return <td key={index}>{i}</td>
                                   })} 
                                </tr>
                                <tr>
                                    <td>{regions[5]}</td>
                                    {context.revenue.regional.northWest.map((i, index)=>{
                                      return <td key={index}>{i}</td>
                                   })} 
                                </tr>
                                <tr>
                                    <td>{regions[6]}</td>
                                    {context.revenue.regional.midWest.map((i, index)=>{
                                      return <td key={index}>{i}</td>
                                   })} 
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

export default Revenue
