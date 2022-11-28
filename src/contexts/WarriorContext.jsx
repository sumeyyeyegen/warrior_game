import { createContext, useEffect, useState } from "react";
import Warrior from "../core/warrior";

export const WarriorContext = createContext();

const WarriorContextProvider = (props) => {
  const [warriors, setWarriors] = useState([]);
  const [warriorId, setWarriorId] = useState();
  const [warriorDetail, setWarriorDetail] = useState();
  const [randomWarrior, setRandomWarrior] = useState();
  const [selectedWarriorId, setSelectedWarriorId] = useState();
  const [selectedWarriorDetail, setSelectedWarriorDetail] = useState();
  
  const [selectedWarriorInfo, setSelectedWarriorInfo] = useState({id:1,text:"Atak",warrior:{id:"",text:"",hp:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}});
  const [randomWarriorInfo,setRandomWarriorInfo] = useState({id:2,text:"Defans",warrior:{id:"",text:"",hp:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}})
  const [warDet, setWarDet] = useState({
    id: "",
    skill1: false,
    skill2: false,
    skill3: false,
    skill4: false,
  });

  const attack = (attacker, defenser ,location,turn) => {
    //location ===1 ? Yakın  ===2 uzak
    //mesela uzak seçtik
    //mesela random olarak uzak seçildi.
    console.log(attacker)
    console.log(defenser)
    console.log(location)
    console.log(turn)


    let attackerDefenseSkill = attacker.skills.filter(skill => skill.skill_type === 2);
    let attackerAttackSkill = attacker.skills.filter(skill => skill.skill_type === 1); 
    let defenserDefenseSkill = defenser.skills.filter(skill => skill.skill_type === 2);
    let defenserAttackSkill = defenser.skills.filter(skill => skill.skill_type === 1); 


    let attackerAttackSkillFar = attackerAttackSkill.filter(skill => skill.skill_type_option === 2); 
    let attackerAttackSkillNear = attackerAttackSkill.filter(skill => skill.skill_type_option === 1);
    let attackerDefenseSkillFar = attackerDefenseSkill.filter(skill => skill.skill_type_option === 2); 
    let attackerDefenseSkillNear = attackerDefenseSkill.filter(skill => skill.skill_type_option === 1);

    let defenserAttackSkillFar = defenserAttackSkill.filter(skill => skill.skill_type_option === 2); 
    let defenserAttackSkillNear = defenserAttackSkill.filter(skill => skill.skill_type_option === 1);
    let defenserDefenseSkillFar = defenserDefenseSkill.filter(skill => skill.skill_type_option === 2); 
    let defenserDefenseSkillNear = defenserDefenseSkill.filter(skill => skill.skill_type_option === 1);
    
    // if(location === )

    const DefenserReceivedDamage = attackerAttackSkillFar[0]?.point;
    const AttackerReceivedDamage = defenserDefenseSkillFar[0]?.point;

    return {attackerDemage:AttackerReceivedDamage,defenserDemage:DefenserReceivedDamage};
  };

  const defense = ({ attacker, defenser,location,turn }) => {
    //location ===1 ? Yakın  ===2 uzak
    let attackerDefenseSkill = attacker.skills.filter(skill => skill.skill_type === 2);
    let attackerAttackSkill = attacker.skills.filter(skill => skill.skill_type === 1); 
    let defenserDefenseSkill = defenser.skills.filter(skill => skill.skill_type === 2);
    let defenserAttackSkill = defenser.skills.filter(skill => skill.skill_type === 1); 

    let attackerAttackSkillFar = attackerAttackSkill.filter(skill => skill.skill_type_option === 2); 
    let attackerAttackSkillNear = attackerAttackSkill.filter(skill => skill.skill_type_option === 1);
    let attackerDefenseSkillFar = attackerDefenseSkill.filter(skill => skill.skill_type_option === 2); 
    let attackerDefenseSkillNear = attackerDefenseSkill.filter(skill => skill.skill_type_option === 1);

    let defenserAttackSkillFar = defenserAttackSkill.filter(skill => skill.skill_type_option === 2); 
    let defenserAttackSkillNear = defenserAttackSkill.filter(skill => skill.skill_type_option === 1);
    let defenserDefenseSkillFar = defenserDefenseSkill.filter(skill => skill.skill_type_option === 2); 
    let defenserDefenseSkillNear = defenserDefenseSkill.filter(skill => skill.skill_type_option === 1);

    const DefenserReceivedDamage = attackerAttackSkillFar[0]?.point;
    const AttackerReceivedDamage = defenserDefenseSkillFar[0]?.point;
    // const receivedDamage =
    //   attacker.attack 
  
    // const finalDamage = receivedDamage - defenser.defense / 2;
  
    return [AttackerReceivedDamage,DefenserReceivedDamage];
  };

  
  useEffect(() =>{
    let bashData = selectedWarriorInfo;
    if(selectedWarriorDetail!==undefined){
    bashData.warrior.id=selectedWarriorDetail?.id;
    bashData.warrior.text=selectedWarriorDetail?.name;
    bashData.warrior.hp=selectedWarriorDetail?.hp;

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
        defense,
        attack,
        selectedWarriorInfo, setSelectedWarriorInfo,
        randomWarriorInfo,setRandomWarriorInfo
      }}
    >
      {props.children}
    </WarriorContext.Provider>
  );
};

export default WarriorContextProvider;
