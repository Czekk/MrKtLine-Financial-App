import React from 'react'
import styles from './ConfigBar.module.css'
import { ButtonGroup, Button, } from 'react-bootstrap'
import ControlContext from '../../Context/ControlContext'
import useAuth from '../../Auth/UseAuth'

const ConfigBar = () => {
    const auth= useAuth();
    const ytd='YTD'
    const qtd='QTD'
    const mtd='MTD'
    const wtd='WTD'
    return (
        <ControlContext.Consumer>
        {context=>(<>
            <div className={styles.config_container}>
                <h6 className={styles.config_text}>
                    Period : 
                    <ButtonGroup className=''>
                        <Button className='shadow-none' variant='secondary' active={context.currentPeriod=== 'YTD'? true: false} onClick={()=>{context.currentPeriodHandler(ytd)}}>YTD</Button>
                        <Button className='shadow-none' variant='secondary' active={context.currentPeriod=== 'QTD'? true: false} onClick={()=>{context.currentPeriodHandler(qtd)}}>QTD</Button>
                        <Button className='shadow-none' variant='secondary' active={context.currentPeriod=== 'MTD'? true: false} onClick={()=>{context.currentPeriodHandler(mtd)}}>MTD</Button>
                        <Button className='shadow-none' variant='secondary' active={context.currentPeriod=== 'WTD'? true: false} onClick={()=>{context.currentPeriodHandler(wtd)}}>WTD</Button>
                    </ButtonGroup>
                </h6>

               {auth.preference.showQuickPoints?<><h6 className={styles.index_group}>
                    <Button className='shadow-none' variant='success' >Revenue: 12M</Button> {' '}
                    <Button className='shadow-none' variant='success' >RoA: 1.1</Button> {' '}
                    <Button className='shadow-none' variant='warning' >RoE: 3.6%</Button>{' '}
                    <Button className='shadow-none' variant='secondary' >WCR: 10.5</Button>{' '}
                    <Button className='shadow-none' variant='success' >DER: 28%</Button>{' '}
                    <Button className='shadow-none' variant='danger' >DAR: 17.5%</Button>
                </h6></>: null}
            </div>  
        </>)}
        </ControlContext.Consumer>
    )
}

export default ConfigBar
