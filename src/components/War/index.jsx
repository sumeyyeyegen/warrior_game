import React, { useContext, useEffect, useState } from "react";
import { WarriorContext } from "../../contexts/WarriorContext";
import { WarMode } from "./War/WarMode";
import alert from "../../helper/Alert";
import styles from "./styles.module.css";

function War() {
  const {
    warriors,
    setWarriorId,
    warriorDetail,
    randomWarrior,
    selectedWarriorDetail,
    setSelectedWarriorDetail,
    selectedWarriorId,
    setSelectedWarriorId,
  } = useContext(WarriorContext);

  const [winner, setWinner] = useState();
  const [mode, setMode] = useState("start");

  return (
    <div className={`${styles.main} container`}>
      {mode === "start" && (<>
          <div className="mb-3 d-flex justify-content-center mt-5">
            <div className=" text-start border p-4 rounded bg-form">
              <label className="label form-label" htmlFor="">
                Savaşçı Seç
              </label>
              <div className="d-flex justify-content-center">
              <select
                className="border-0 rounded me-2"
                onChange={(e) => {
                  setWarriorId(Number(e.target.value));
                  setSelectedWarriorId(e.target.value);
                }}
              >
                <option value="-1">Bir Savaşçı Seçiniz</option>
                {warriors !== []
                  ? warriors?.map((warrior, index) => {
                      return <option value={warrior.id}>{warrior.name}</option>;
                    })
                  : ""}
              </select>
              <button
            className="btn btn-success"
            disabled={mode === "war"}
            onClick={() => {
              if(selectedWarriorId!==-1){
              selectedWarriorDetail.skills.length === 4 &&
              randomWarrior.skills.length === 4
                ? setMode("war")
                : alert().Info("Tüm yetenek değerlerini eksiksiz giriniz");
              }else{
                alert().Info("Savaşa başlamadan önce bir savaşçı seçmelisiniz.")
              }
            }}
          >
            Savaşa Başla
          </button>
          </div>
            </div>
            
          </div>

          
          </>
      )}
      {mode === "war" && (
        <WarMode
          onGameEnd={(winner) => {
            setWinner(winner);
            setMode("gameOver");
          }}
        />
      )}
      {mode === "gameOver" && <div className="game-over">Game Over</div>}
    </div>
  );
}
export default War;
