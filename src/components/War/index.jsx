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
  const [mode, setMode] = useState("gameOver");

  return (
    <div className={styles.main}>
      {mode === "start" && (<>
          <div className="mb-3 d-flex mt-5">
            <div className=" text-start border p-4 rounded bg-test">
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
              selectedWarriorDetail.skills.length === 4 &&
              randomWarrior.skills.length === 4
                ? setMode("war")
                : alert().Info("Tüm yetenek değerlerini eksiksiz giriniz");
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
