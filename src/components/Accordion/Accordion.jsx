import { useContext, useState } from "react";
import { WarriorContext } from "../../contexts/WarriorContext";
import AccordionItem from "./AccordionItem";
import '../../assets/css/main.css'

const Accordion = ({setTab}) => {
  const { warriors } = useContext(WarriorContext);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  return (
    warriors!==[] && warriors.length!==0 && warriors.map((warrior,index) =>{
      return <div className="accordion-item">
      <div className="accordion-title d-flex align-items-center" onClick={() => activeIndex === index ? setActiveIndex(-1):setActiveIndex(index) } >
        <h6>{warrior.name}</h6>
        <div className="fw-bold">{warrior.hp}</div>
        <div className="fw-bold fs-5">{activeIndex===index ? '^' : 'v'}</div>
      </div>
      {activeIndex===index && <AccordionItem setTab={setTab} warrior={warrior} activeIndex={activeIndex}/>}
    </div>
    })
    
  );
};

export default Accordion;
