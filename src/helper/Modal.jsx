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
      <div className="modal-overlay1" />
      <div
        className="modal-wrapper1"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="custom-modal">
          <div className="modal-header1">
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
            <div className="row my-3">
              <label className="col-3 text-end" htmlFor="">Savaşçı Adı</label>
              <input className="col-7" type="text" ref={warriorNameRef} />
            </div>
            <div  className="row d-flex mb-3">
              <label className="col-3 text-end" htmlFor="">Puan</label>
              <input className="col-7" type="text" ref={pointRef} />
            </div>
            <button className="btn btn-success" onClick={() => addWarrior()}>Savaşçı ekle</button>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Modal;
