import React, { useContext, useEffect, useState } from "react";
import { WarriorContext } from "../../contexts/WarriorContext";
import Warrior from '../../core/warrior'

function War() {
    const {
        setWarriorId,
        warriorDetail,
        randomWarrior,
        selectedWarriorDetail, 
        setSelectedWarriorDetail,
        selectedWarriorId, 
        setSelectedWarriorId
    } = useContext(WarriorContext);

  const [warActive, setWarActive] = useState(false);
  const [attactSide, setAttackSide] = useState(0);
  const [defenseSide, setDefenseSide] = useState(1);
  const { warriors } = useContext(WarriorContext);
  
  const [warSide, setWarSide] = useState([
    {id:1,text:"Atak",warrior:{id:"",text:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}},
    {id:2,text:"Defans",warrior:{id:"",text:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}}]);

  useEffect(() =>{
    let bashData = warSide;
    if(selectedWarriorDetail!==undefined){
    bashData[0].warrior.id=selectedWarriorDetail?.id;
    bashData[0].warrior.text=selectedWarriorDetail?.name;

    let atak = selectedWarriorDetail.skills.filter(skill => Number(skill.skill_type)===1);
    let defans = selectedWarriorDetail.skills.filter(skill => Number(skill.skill_type)===2);

    bashData[0].warrior.skills.atak.uzak= atak.filter(item => item.skill_type_option===2)
    bashData[0].warrior.skills.atak.yakın= atak.filter(item => item.skill_type_option===1)
    bashData[0].warrior.skills.defans.uzak= defans.filter(item => item.skill_type_option===2)
    bashData[0].warrior.skills.defans.yakın= defans.filter(item => item.skill_type_option===1)


    bashData[1].warrior.id=randomWarrior?.id;
    bashData[1].warrior.text=randomWarrior?.name;

    let atakRandom = randomWarrior.skills.filter(skill => Number(skill.skill_type)===1);
    let defansRondom = randomWarrior.skills.filter(skill => Number(skill.skill_type)===2);

    bashData[1].warrior.skills.atak.uzak = atakRandom.filter(item => item.skill_type_option===2)
    bashData[1].warrior.skills.atak.yakın = atakRandom.filter(item => item.skill_type_option===1)
    bashData[1].warrior.skills.defans.uzak = defansRondom.filter(item => item.skill_type_option===2)
    bashData[1].warrior.skills.defans.yakın = defansRondom.filter(item => item.skill_type_option===1)

    console.log(bashData);
    setWarSide(bashData);
  }
  },[selectedWarriorDetail,randomWarrior]);

  useEffect(() =>{
    console.log(warSide)
  },[warSide]);


  return (
    <div style={{ minHeight: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-around",paddingTop:"40px" }}>
        <label htmlFor="">Savaşçı Seç</label>
        <select onChange={(e) => {setWarriorId(Number(e.target.value)); setSelectedWarriorId(e.target.value)}}>
          <option value="-1">Bir Savaşçı Seçiniz</option>
          {warriors !== []
            ? warriors?.map((warrior, index) => {
                return <option value={warrior.id}>{warrior.name}</option>;
              })
            : ""}
        </select>
        <button disabled={warActive} onClick={() => setWarActive(true)}>
          Başla
        </button>
      </div>
      { warActive ?
      <div style={{display:"flex", justifyContent:"space-around",marginTop:"70px"}}>
        <div>{warriorDetail.name}<div>{warriorDetail.hp}</div> <div style={{listStyle:"none"}}>
        {/* <select>
            {warSide.map(side =>{
            return <option>
                {side}
            </option>
            })}
            </select> */}
        </div> </div>
        <h1>VS.</h1>
        <div>{randomWarrior?.name} <div>{randomWarrior.hp}</div> </div>
      </div>:""
      }
    </div>
  );
}
export default War;
