import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/main.css";
import { MainContext } from "../../contexts/MainContext";
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
    const {tab,setTab} = useContext(MainContext);
    const [row, setRow] = useState([{ index: 0 }]);
    const [deleteRes, setDeleteRes] = useState("");
    const [warriorDeleteRes, setWarriorDeleteRes] = useState("");

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
                console.log(res)
                setDeleteRes(res);
            });
            }
        })
        
    }

    useEffect(() => {
        console.log(deleteRes)
        if (deleteRes.status === 200) {
            window.location.reload(true);
            setTab(2);
            alert().Success();
            setDeleteRes("");
        }
    }, [deleteRes]);

    useEffect(() => {
        console.log(warriorDeleteRes)
        if (warriorDeleteRes.status === 200) {
            window.location.reload(true);
            setTab(2);
            alert().Success();
            setWarriorDeleteRes("");
        }
    }, [warriorDeleteRes]);



    function DeleteWarrior(){
        alert().Question((r) =>{
            if(r){
                Warrior().DeleteWarrior(warrior.id).then(res =>{
                    setWarriorDeleteRes(res);
                })
            }
        })
    }

    function handleChange() { }

    return (
        <div className="accordion-content ">
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-danger" onClick={() => DeleteWarrior()}>Savaşçı sil</button>
            </div>
            <div>
                <div className="accordion-header d-flex justify-content-between mb-2 align-items-center">
                    <div className="ms-5">Tür</div>
                    <div>Alt Tür</div> 
                    <div>Hasar Puanı</div>
                    <button className="btn btn-sm btn-outline-danger" style={{paddingLeft:"10px",paddingRight:"10px"}} onClick={() => addRow()}>+</button>
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
                                            marginBottom:"5px"
                                        }}
                                    >
                                        <SelectType handleChange={handleChange} skill={skill} />
                                        <div style={{marginRight:"6rem"}}>{skill.point}</div>
                                        <div>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteSkill(skill.id)}>Sil</button>
                                        </div>
                                    </div>
                                </>
                            );
                        })
                        : ""}
                    {row?.map((thing, i) => {
                        return <AddSkill setTab={setTab} warrior={warrior} />;
                    })}
                </div>
            </div>
        </div>
    );
}
export default AccordionItem;
