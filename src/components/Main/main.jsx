import React, { useContext, useEffect, useState } from 'react'
import WarPage from '../War/index'
import SettingPage from '../Settings/index'
import { MainContext } from '../../contexts/MainContext'

function Main(){
    const {tab,setTab} = useContext(MainContext);

    useEffect(() =>{
        setTab(2);
    },[])
 
    return(
        <div className='main-page'>
            <ul className='main-header'>
               <li className={`main-header-item ${tab===1? "active":""}`} onClick={() => setTab(1)}>Savaş</li>
               <li className={`main-header-item ${tab===2 ? "active":""}`} onClick={() =>setTab(2)}>Ayarlar</li> 
            </ul>
            {
                tab === 1 ? <WarPage/>:<SettingPage tab={tab} setTab={setTab}/>
            }
        </div>
    )
}
export default Main;