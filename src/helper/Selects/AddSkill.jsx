import { useContext, useEffect, useRef, useState } from "react";
import { WarriorContext } from "../../contexts/WarriorContext";
import Skill from "../../core/skill";
import Warrior from "../../core/warrior";
import alert from "../Alert";

const AddSkill = () => {
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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
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

      <select onChange={(e) => setSelectedSkillTypes(e.target.value)}>
        <option value="-1">Bir değer seçiniz.</option>
        {selectList?.map((type) => {
          if (type?.type === true) {
            return <option value={type?.id}>{type?.text}</option>;
          }
        })}
      </select>
      <select onChange={(e) => setSelectedSkillTypeOptions(e.target.value)}>
        <option value="-1">..</option>
        {filteredSubSkill?.subOptions?.map((type) => {
          if (type?.type === true) {
            return <option value={type?.id}>{type?.text}</option>;
          }
        })}
      </select>
      <input type="text" ref={pointRef} />
      <div>
        <button onClick={() => addSkill()}>Kaydet</button>
        <button >Sil</button>
      </div>
    </div>
  );
};

export default AddSkill;
