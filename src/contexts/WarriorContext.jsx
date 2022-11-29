import { createContext, useEffect, useState } from "react";
import Warrior from "../core/warrior";

export const WarriorContext = createContext();

const WarriorContextProvider = (props) => {
  const [warriors, setWarriors] = useState([]);
  const [warriorId, setWarriorId] = useState();
  const [warriorDetail, setWarriorDetail] = useState();
  const [randomWarrior, setRandomWarrior] = useState();
  const [selectedWarriorId, setSelectedWarriorId] = useState(-1);
  const [selectedWarriorDetail, setSelectedWarriorDetail] = useState();
  
  const [selectedWarriorInfo, setSelectedWarriorInfo] = useState({warrior:{id:"",text:"",hp:"",maxHP:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}});
  const [randomWarriorInfo,setRandomWarriorInfo] = useState({warrior:{id:"",text:"",hp:"",maxHP:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}})
  const [warDet, setWarDet] = useState({
    id: "",
    skill1: false,
    skill2: false,
    skill3: false,
    skill4: false,
  });

  const attackNearFunc = ({ attacker, receiver }) => {
    //atakçının defansçıya verdiği toplam hasar(yakın)
    console.log(attacker)
    const receivedDamage =attacker?.skills.atak.yakın[0].point;
    console.log(receivedDamage)
    const finalDamage = receivedDamage
  
    return finalDamage;
  };
  const attackFarFunc = ({ attacker, receiver }) => {
    //atakçının defansçıya verdiği toplam hasar(uzak)
    const receivedDamage =attacker?.skills.atak.uzak[0].point;
    console.log(receivedDamage)
    const finalDamage = receivedDamage;
  
    return finalDamage;
  };
  const deffenseNearFunc = ({ attacker, receiver }) => {
    //defansçının atakçıya verdiği toplam hasar(yakın)
    const receivedDamage = attacker?.skills.defans.yakın[0].point;
    console.log(receivedDamage)
    const finalDamage = receivedDamage
  
    return finalDamage;
  };
  const deffenseFarFunc = ({ attacker, receiver }) => {
    //defansçının atakçıya verdiği toplam hasar(uzak)
    const receivedDamage = attacker?.skills.defans.uzak[0].point;
    console.log(receivedDamage)
    const finalDamage = receivedDamage
  
    return finalDamage;
  };
  
  
  useEffect(() =>{
    let bashData = selectedWarriorInfo;
    if(selectedWarriorDetail!==undefined){
    bashData.warrior.id=selectedWarriorDetail?.id;
    bashData.warrior.text=selectedWarriorDetail?.name;
    bashData.warrior.hp=selectedWarriorDetail?.hp;
    bashData.warrior.maxHP=selectedWarriorDetail?.hp;

    let atak = selectedWarriorDetail.skills.filter(skill => Number(skill.skill_type)===1);
    let defans = selectedWarriorDetail.skills.filter(skill => Number(skill.skill_type)===2);

    bashData.warrior.skills.atak.uzak= atak.filter(item => item.skill_type_option===2)
    bashData.warrior.skills.atak.yakın= atak.filter(item => item.skill_type_option===1)
    bashData.warrior.skills.defans.uzak= defans.filter(item => item.skill_type_option===2)
    bashData.warrior.skills.defans.yakın= defans.filter(item => item.skill_type_option===1)

    let bashData1 = randomWarriorInfo;

    bashData1.warrior.id=randomWarrior?.id;
    bashData1.warrior.text=randomWarrior?.name;
    bashData1.warrior.hp=randomWarrior?.hp;
    bashData1.warrior.maxHP=randomWarrior?.hp;

    let atakRandom = randomWarrior.skills.filter(skill => Number(skill.skill_type)===1);
    let defansRondom = randomWarrior.skills.filter(skill => Number(skill.skill_type)===2);

    bashData1.warrior.skills.atak.uzak = atakRandom.filter(item => item.skill_type_option===2)
    bashData1.warrior.skills.atak.yakın = atakRandom.filter(item => item.skill_type_option===1)
    bashData1.warrior.skills.defans.uzak = defansRondom.filter(item => item.skill_type_option===2)
    bashData1.warrior.skills.defans.yakın = defansRondom.filter(item => item.skill_type_option===1)

    setSelectedWarriorInfo(bashData);
    setRandomWarriorInfo(bashData1);
  }
  },[selectedWarriorDetail,randomWarrior]);

  const [selectList, setSelectList] = useState([
    {
      id: 1,
      text: "Atak",
      type: true,
      subOptions: [
        { id: 1, text: "Yakın Mesafe", type: true },
        { id: 2, text: "Uzak Mesafe", type: true },
      ],
    },
    {
      id: 2,
      text: "Defans",
      type: true,
      subOptions: [
        { id: 1, text: "Yakın Mesafe", type: true },
        { id: 2, text: "Uzak Mesafe", type: true },
      ],
    },
  ]);

  function SkillControl(detail) {
    let bashData = warDet;
    bashData.id = detail?.id;
    detail?.skills?.length > 0 &&
      detail?.skills?.map((skill, i) => {
        if (skill.skill_type === 1 && skill.skill_type_option === 1) {
          bashData.skill1 = true;
        } else if (skill.skill_type === 1 && skill.skill_type_option === 2) {
          bashData.skill2 = true;
        } else if (skill.skill_type === 2 && skill.skill_type_option === 1) {
          bashData.skill3 = true;
        } else if (skill.skill_type === 2 && skill.skill_type_option === 2) {
          bashData.skill4 = true;
        }
      });
    setWarDet(JSON.parse(JSON.stringify(bashData)));
  }

  function SelectControl(detail, id) {
    let bashData = [
      {
        id: 1,
        text: "Atak",
        type: true,
        subOptions: [
          { id: 1, text: "Yakın Mesafe", type: true },
          { id: 2, text: "Uzak Mesafe", type: true },
        ],
      },
      {
        id: 2,
        text: "Defans",
        type: true,
        subOptions: [
          { id: 1, text: "Yakın Mesafe", type: true },
          { id: 2, text: "Uzak Mesafe", type: true },
        ],
      },
    ];
    if (id === detail.id) {
      if (detail.skill1 === true) {
        if (detail.skill2 === true) {
          bashData[0].type = false;
          bashData[0].subOptions[0].type = false;
          bashData[0].subOptions[1].type = false;
        } else {
          bashData[0].subOptions[0].type = false;
        }
      } else {
        if (detail.skill2 === true) {
          bashData[0].subOptions[0].type = false;
        }
      }
      if (detail.skill3 === true) {
        if (detail.skill4 === true) {
          bashData[1].type = false;
          bashData[1].subOptions[0].type = false;
          bashData[1].subOptions[1].type = false;
        } else {
          bashData[1].subOptions[0].type = false;
        }
      } else {
        if (detail.skill4 === true) {
          bashData[1].subOptions[0].type = false;
        }
      }
    }
    setSelectList(JSON.parse(JSON.stringify(bashData)));
  }

  useEffect(() => {
    SelectControl(warDet, warriorId);
  }, [warDet, warriorId]);

  function getRandomPlayer() {
    let player;
    for (let i = warriors?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      player = warriors[j];
      setRandomWarrior(JSON.parse(JSON.stringify(warriors[j])))
    }

    return player;
  }

  useEffect(() => {
    getRandomPlayer();
  }, [warriors]);

  useEffect(() =>{
    if(Number(selectedWarriorId)!==Number(randomWarrior?.id)){
      if(selectedWarriorId!==undefined){
        Warrior().WarriorById(selectedWarriorId).then(res =>{
          setSelectedWarriorDetail(res);
        })
        // let newWars = warriors.filter(war => war.id!==Number(selectedWarriorId));
        // console.log(newWars)
        // setWarriors(newWars);
      }
    }else{
      getRandomPlayer()
    }
  },[selectedWarriorId,randomWarrior]);

  useEffect(() => {
    Warrior()
      .WarriorList()
      .then((res) => {
        setWarriors(res);
      });
  }, []);

  useEffect(() => {
    if (warriorId !== undefined) {
      setWarDet(
        JSON.parse(
          JSON.stringify({
            id: warriorId,
            skill1: false,
            skill2: false,
            skill3: false,
            skill4: false,
          })
        )
      );
      Warrior()
        .WarriorById(warriorId)
        .then((res) => {
          setWarriorDetail(res);
        });
    }
  }, [warriorId]);

  return (
    <WarriorContext.Provider
      value={{
        warriors,
        setWarriors,
        warriorId,
        setWarriorId,
        warriorDetail,
        setWarriorDetail,
        SkillControl,
        warDet,
        setWarDet,
        SelectControl,
        selectList,
        setSelectList,
        randomWarrior,
        setRandomWarrior,
        selectedWarriorId, 
        setSelectedWarriorId,
        selectedWarriorDetail, 
        setSelectedWarriorDetail,
        selectedWarriorInfo, setSelectedWarriorInfo,
        randomWarriorInfo,setRandomWarriorInfo,
        attackNearFunc,
        attackFarFunc,
        deffenseNearFunc,
        deffenseFarFunc 
      }}
    >
      {props.children}
    </WarriorContext.Provider>
  );
};

export default WarriorContextProvider;
