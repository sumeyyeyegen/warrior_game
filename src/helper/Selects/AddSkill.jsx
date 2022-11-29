import { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../contexts/MainContext";
import { WarriorContext } from "../../contexts/WarriorContext";
import Skill from "../../core/skill";
import Warrior from "../../core/warrior";
import alert from "../Alert";

const AddSkill = () => {
  const {tab,setTab} = useContext(MainContext);
  const { warDet, SelectControl, selectList, setSelectList, setWarriors } =
    useContext(WarriorContext);
  const [selectedSkillTypes, setSelectedSkillTypes] = useState(-1);
  const [selectedSkillTypeOptions, setSelectedSkillTypeOptions] = useState(-1);
  const [filteredSubSkill, setFilteredSubSkill] = useState([]);
  const [insertRes, setInsertRes] = useState("");

  const pointRef = useRef();

  function FindSubOptions() {
    let data = selectList.filter(
      (skill) => skill?.id === Number(selectedSkillTypes)
    );
    setFilteredSubSkill(...data);
  }

  useEffect(() => {
    FindSubOptions();
  }, [selectedSkillTypes]);

  function addSkill() {
    if (selectedSkillTypes !== -1) {
      if (selectedSkillTypeOptions !== -1) {
        if (pointRef.current.value !== "") {
          if (Number(pointRef.current.value) <= 20) {
            let insertData = {
              warrior_id: warDet.id,
              skill_type: Number(selectedSkillTypes),
              skill_type_option: Number(selectedSkillTypeOptions),
              point: Number(pointRef.current.value),
            };
            Skill()
              .AddSkill(insertData)
              .then((res) => {
                setInsertRes(res);                
              });
          } else {
            alert().Info("Hasar Puanı En Fazla 20 Olabilir");
          }
        } else {
          alert().Info("Hasar Puanı Girmelisiniz");
        }
      } else {
        alert().Info("Alt tür seçmeden özellik ekleyemezsiniz");
      }
    } else {
      alert().Info("Bir tür seçmelisiniz");
    }
  }


  useEffect(() => {
    if (insertRes.status === 200) {
      window.location.reload(true);
      setTab(2);
      alert().Success();
      setInsertRes("");
      setSelectedSkillTypeOptions(JSON.parse(JSON.stringify(-1)));
      setSelectedSkillTypes(JSON.parse(JSON.stringify(-1)));
      pointRef.current.value = "";
      Warrior()
        .WarriorList()
        .then((res) => {
          setWarriors(res);
        });
    } else if (insertRes.status === 400) {
      alert().Error("Aynı özellik tipi için farklı değerler girilemezz!");
      console.log(insertRes);
      setInsertRes("");
      setSelectedSkillTypeOptions(JSON.parse(JSON.stringify(-1)));
      setSelectedSkillTypes(JSON.parse(JSON.stringify(-1)));
      pointRef.current.value = "";
    }
  }, [insertRes]);



  return (
    <div className="d-flex justify-content-between">
      {/* <select onChange={(e) => setSelectedSkillTypes(e.target.value)}>
        {
          selectList?.map((item,i) =>{
            return <option value={item.id}>{item.text}</option>;
          })
        }
        {skillType.map((type) => {
          return <option value={type.id}>{type.text}</option>;
        })}
      </select>
      <select>
        {selectList?.subOptions?.map((option) => {
            return <option value={option.id}>{option.text}</option>;
          })
        }
      </select> */}
    <div className="d-flex justify-content-between w-50">
      <select className="form-select me-4" onChange={(e) => setSelectedSkillTypes(e.target.value)}>
        <option value="-1">Bir değer seçiniz.</option>
        {selectList?.map((type) => {
          if (type?.type === true) {
            return <option value={type?.id}>{type?.text}</option>;
          }
        })}
      </select>
      <select className="form-select" onChange={(e) => setSelectedSkillTypeOptions(e.target.value)}>
        <option value="-1">Bir değer seçiniz.</option>
        
        {filteredSubSkill?.subOptions?.map((type) => {
          if (type?.type === true) {
            return <option value={type?.id}>{type?.text}</option>;
          }
        })}
      </select>
      </div>
      <input className="form-control" style={{width:"20%",marginRight:"2rem"}} type="text" ref={pointRef} />
      <div>
        <button className="btn btn-success btn-sm me-2" onClick={() => addSkill()}>Kaydet</button>
        <button className="btn btn-danger btn-sm" >Sil</button>
      </div>
    </div>
  );
};

export default AddSkill;
