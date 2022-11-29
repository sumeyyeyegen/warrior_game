import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/main.css";
import { WarriorContext } from "../../contexts/WarriorContext";
import Skill from "../../core/skill";
import Warrior from "../../core/warrior";
import alert from "../../helper/Alert";
import AddSkill from "../../helper/Selects/AddSkill";
import SelectType from "../../helper/Selects/SelectType";
import SelectTypeOption from "../../helper/Selects/SelectTypeOption";

function AccordionItem({ warrior, activeIndex }) {
    const {
        setWarriorId,
        warriorDetail,
        SkillControl,
        warDet,
        SelectControl,
        setWarriors,
    } = useContext(WarriorContext);
    const [row, setRow] = useState([{ index: 0 }]);
    const [deleteRes, setDeleteRes] = useState("");

    useEffect(() => {
        setWarriorId(warrior.id);
    }, [warrior]);

    useEffect(() => {
        // setSkills(warriorDetail?.skills)
        if (warriorDetail !== undefined) {
            SkillControl(warriorDetail);
        }
    }, [warriorDetail]);

    useEffect(() => {
        // setSkills(warriorDetail?.skills)
        SelectControl(warDet, warrior.id);
    }, [warrior, warDet]);

    function addRow() {
        setRow([...row, { index: 1 }]);
    }

    function deleteSkill(id) {
        alert().Question((r) =>{
            if(r){
            Skill().DeleteSkill(id).then((res) => {
                setDeleteRes(res);
            });
            }
        })
        
    }

    useEffect(() => {
        if (deleteRes.status === 200) {
            alert().Success();
            setDeleteRes("");
            Warrior()
                .WarriorList()
                .then((res) => {
                    setWarriors(res);
                });
        }
    }, [deleteRes]);

    function handleChange() { }

    return (
        <div className="accordion-content">
            <button className="btn btn-danger">Savaşçı sil</button>
            <div>
                <div className="accordion-header">
                    <div>Tür</div>
                    <div>Alt Tür</div> 
                    <div>Hasar Puanı</div>
                    <button onClick={() => addRow()}>Ekle</button>
                </div>
                <div>
                    {warrior.skills?.length > 0
                        ? warrior.skills?.map((skill) => {
                            return (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <SelectType handleChange={handleChange} skill={skill} />
                                        <div>{skill.point}</div>
                                        <div>
                                            <button onClick={() => deleteSkill(skill?.id)}>Sil</button>
                                        </div>
                                    </div>
                                </>
                            );
                        })
                        : ""}
                    {row?.map((thing, i) => {
                        return <AddSkill warrior={warrior} />;
                    })}
                </div>
            </div>
        </div>
    );
}
export default AccordionItem;
