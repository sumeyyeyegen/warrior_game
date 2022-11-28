
export const WarMenu = ({ onAttack, onDefense }) => (
  <div>
    <div onClick={onAttack}>
      Attack
    </div>
    <div onClick={onDefense} >
      Defense
    </div>
  </div>
);
