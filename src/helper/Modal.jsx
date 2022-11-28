import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "../assets/css/modal.css";
import Warrior from "../core/warrior";
import alert from "./Alert";

const Modal = ({ isShowing, hide }) => {
  const warriorNameRef = useRef();
  const pointRef = useRef();

  function addWarrior() {
    // console.log(pointRef.current.value.typeOf());
    if (Number(pointRef.current.value)>=80 && Number(pointRef.current.value)<=100) {
      let data = {
        name: warriorNameRef.current.value,
        hp: Number(pointRef.current.value),
      };
      Warrior()
        .AddWarrior(data)
        .then((res) => {
          if (res.status === 200) {
            alert().Success();
            hide();
          } else {
            alert().Error();
          }
        });
    }else{
        alert().Info();
    }
  }

  return (
    <React.Fragment>
      <div className="modal-overlay" />
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="modal-header">
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>
            <div>
              <label htmlFor="">Savaşçı Adı</label>
              <input type="text" ref={warriorNameRef} />
            </div>
            <div>
              <label htmlFor="">Puan</label>
              <input type="text" ref={pointRef} />
            </div>
            <button onClick={() => addWarrior()}>Savaşçı ekle</button>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Modal;
