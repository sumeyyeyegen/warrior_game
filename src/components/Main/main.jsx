import React, { useContext, useEffect, useState } from 'react'
import WarPage from '../War/index'
import SettingPage from '../Settings/index'
import { WarriorContext } from '../../contexts/WarriorContext';

function Main(){
    const [tab,setTab] = useState(1);
 
    return(
        <div className='main-page'>
            <ul className='main-header'>
               <li className={`main-header-item ${tab===1? "active":""}`} onClick={() => setTab(1)}>Savaş</li>
               <li className={`main-header-item ${tab===2 ? "active":""}`} onClick={() =>setTab(2)}>Ayarlar</li> 
            </ul>
            <div className="container">
            {
                tab === 1 ? <WarPage/>:<SettingPage/>
            }
            </div>
        </div>
    )
}
export default Main;