import React from 'react'
import Modal from '../../helper/Modal';
import useModal from '../../helper/hooks/useModal';
import Accordion from '../Accordion/Accordion';

function Settings({tab,setTab}) {
    const {isShowing, toggle} = useModal();
return(<div className='container'>
    <div className='d-flex justify-content-end' style={{padding:"0 60px 0 0"}}>
        <button className='btn btn-success fs-5 mb-4' onClick={toggle}>Savaşçı Ekle</button>
    </div>
    <div style={{display:"flex",justifyContent:"center"}}>
        <ul className='warrior-list'>
        <Accordion setTab={setTab}/>
        </ul>
    </div>
    {
            isShowing ? <Modal
            isShowing={isShowing}
            hide={toggle}/> :null
        }
    </div>
    
)
}
export default Settings;