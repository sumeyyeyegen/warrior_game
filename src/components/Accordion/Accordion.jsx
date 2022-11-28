import { useContext, useState } from "react";
import { WarriorContext } from "../../contexts/WarriorContext";
import AccordionItem from "./AccordionItem";

const Accordion = () => {
  const { warriors } = useContext(WarriorContext);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  return (
    warriors!==[] && warriors.length!==0 && warriors.map((warrior,index) =>{
      return <div className="accordion-item">
      <div className="accordion-title" onClick={() => setActiveIndex(index)}>
        <div>{warrior.name}</div>
        <div>{warrior.hp}</div>
        <div>{activeIndex===index ? '^' : 'v'}</div>
      </div>
      {activeIndex===index && <AccordionItem warrior={warrior} activeIndex={activeIndex}/>}
    </div>
    })
    
  );
};

export default Accordion;
