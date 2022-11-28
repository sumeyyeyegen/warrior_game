import React from 'react'
import Modal from '../../helper/Modal';
import useModal from '../../helper/hooks/useModal';
import Accordion from '../Accordion/Accordion';

function Settings() {
    const {isShowing, toggle} = useModal();
return(<>
    <button onClick={toggle}>Savaşçı Ekle</button>
    <div style={{display:"flex",justifyContent:"center"}}>
        <ul className='warrior-list'>
        <Accordion/>
        </ul>
    </div>
    {
            isShowing ? <Modal
            isShowing={isShowing}
            hide={toggle}/> :null
        }
    </>
    
)
}
export default Settings;