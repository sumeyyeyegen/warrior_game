import React, { useContext, useEffect, useState } from "react";
import { WarriorContext } from "../../contexts/WarriorContext";
import { WarMenu } from "./WarMenu";
import { WarMode } from "./WarMode";
import alert from '../../helper/Alert';

function War() {
    const {
        warriors,
        setWarriorId,
        warriorDetail,
        randomWarrior,
        selectedWarriorDetail, 
        setSelectedWarriorDetail,
        selectedWarriorId, 
        setSelectedWarriorId
    } = useContext(WarriorContext);

    const [winner, setWinner] = useState();
  const [mode, setMode] = useState("start");

  return (
    <div style={{ minHeight: "400px" }}>
      {
        mode==="start" && (
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
        <button disabled={mode==="war"} onClick={() => {
          selectedWarriorDetail.skills.length===4 && randomWarrior.skills.length===4 ?setMode("war"):alert().Info("Tüm yetenek değerlerini eksiksiz giriniz")}}>
          Başla
        </button>
      </div>
        )
      }
      { mode==="war" &&
        <WarMode onGameEnd={winner => {
          setWinner(winner);
          setMode('gameOver');
        }}/>
      }
      {
        mode==="gameOver" && <>Game Over</>
      }
    </div>
  );
}
export default War;
