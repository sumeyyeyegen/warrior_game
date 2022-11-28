import { useContext, useEffect, useState } from 'react';
import { WarriorContext } from '../../contexts/WarriorContext';
import {wait} from '../index'

export const useBattleSequence = sequence => {

  const { randomWarrior,selectedWarriorDetail,attack,defense} = useContext(WarriorContext);
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(selectedWarriorDetail.hp);
  const [opponentHealth, setOpponentHealth] = useState(randomWarrior.hp);


  useEffect(() =>{
    console.log(opponentHealth)
    console.log(playerHealth)
  },[opponentHealth,playerHealth])

  useEffect(() => {
    const { mode, turn } = sequence;

    if (mode) {
      const attacker = turn === 0 ? selectedWarriorDetail : randomWarrior;
      const defenser = turn === 0 ? randomWarrior : selectedWarriorDetail;

      switch (mode) {
        case 'attack': {

          (async () => {
            setInSequence(true);
            // await wait(1000);
            if(turn === 0){
              var damagesAttack ={attacker:"",defenser:""} 
              var damagesDeffense ={attacker:"",defenser:""}
              damagesAttack =  attack(selectedWarriorDetail, randomWarrior,1,turn);
              damagesDeffense =  defense(selectedWarriorDetail, randomWarrior,1,turn);

              let totalDamages = {attacker:damagesAttack.attacker+damagesDeffense.attacker,defenser:damagesAttack.defenser+damagesDeffense.defenser}
              setOpponentHealth(h => (h - totalDamages.defenser > 0 ? h - totalDamages.defenser : 0));
              setPlayerHealth(h => (h - totalDamages.attacker > 0 ? h - totalDamages.attacker : 0))
              // We don't want a negative HP.
              await wait(2000);
            }else{
              var damagesAttack ={attacker:"",defenser:""} 
              var damagesDeffense ={attacker:"",defenser:""}
              damagesAttack =  attack(attacker, defenser,1,turn);
              damagesDeffense =  defense(attacker, defenser,1,turn);

              let totalDamages = {attacker:damagesAttack.attacker+damagesDeffense.attacker,defenser:damagesAttack.defenser+damagesDeffense.defenser}
              setOpponentHealth(h => (h - totalDamages.attacker > 0 ? h - totalDamages.attacker : 0));
              setPlayerHealth(h => (h - totalDamages.defenser > 0 ? h - totalDamages.defenser : 0)) 
            }
          setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }
        case 'defense': {

          (async () => {
            setInSequence(true);
            // await wait(1000);
            if(turn === 0){
              var damagesAttack ={attacker:"",defenser:""} 
              var damagesDeffense ={attacker:"",defenser:""}
              damagesAttack =  attack(attacker, defenser,1,turn);
              damagesDeffense =  defense(attacker, defenser,1,turn);

              let totalDamages = {attacker:damagesAttack.attacker+damagesDeffense.attacker,defenser:damagesAttack.defenser+damagesDeffense.defenser}
              setOpponentHealth(h => (h - totalDamages.attacker > 0 ? h - totalDamages.attacker : 0));
              setPlayerHealth(h => (h - totalDamages.defenser > 0 ? h - totalDamages.defenser : 0))
              // We don't want a negative HP.
              await wait(2000);
            }else{
              var damagesAttack ={attacker:"",defenser:""} 
              var damagesDeffense ={attacker:"",defenser:""}
              damagesAttack =  attack(attacker, defenser,1,turn);
              damagesDeffense =  defense(attacker, defenser,1,turn);

              let totalDamages = {attacker:damagesAttack.attacker+damagesDeffense.attacker,defenser:damagesAttack.defenser+damagesDeffense.defenser}
              setOpponentHealth(h => (h - totalDamages.defenser > 0 ? h - totalDamages.defenser : 0));
              setPlayerHealth(h => (h - totalDamages.attacker > 0 ? h - totalDamages.attacker : 0)) 
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }


        default:
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth
  };
};
