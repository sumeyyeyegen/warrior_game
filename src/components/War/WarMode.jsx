import { useContext, useEffect, useState } from 'react';
import { useAIOpponent } from '../../helper/hooks/useAIOpponent';
import {useBattleSequence} from '../../helper/hooks/useBattleSequence'
import { WarMenu } from './WarMenu';
import { PlayerSummary } from './PlayerSummary';
import { WarriorContext } from '../../contexts/WarriorContext';
import { wait } from '../../helper';

export const WarMode = ({ onGameEnd }) => {
  const [sequence, setSequence] = useState({});

  const {randomWarriorInfo,selectedWarriorInfo } = useContext(WarriorContext);

//   const [warSide, setWarSide] = useState([
//     {id:1,text:"Atak",warrior:{id:"",text:"",hp:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}},
//     {id:2,text:"Defans",warrior:{id:"",text:"",hp:"",skills:{"atak":{"uzak":"","yakın":""},"defans":{"uzak":"","yakın":""}}}}]);


  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    if (selectedWarriorInfo.hp === 0 || randomWarriorInfo.hp === 0) {
      (async () => {
        // await wait(1000);
        onGameEnd(selectedWarriorInfo.hp === 0 ? randomWarriorInfo : selectedWarriorInfo);
      })();
    }
  }, [selectedWarriorInfo, randomWarriorInfo, onGameEnd]);

  return (
    <>
      <div>
        <div>
          <PlayerSummary
            main={false}
            health={randomWarriorInfo.warrior.hp}
            name={randomWarriorInfo.warrior.text}
            maxHealth={randomWarriorInfo.warrior.hp}
          />
        </div>
      </div>

      <div>
        <div>
          {selectedWarriorInfo.warrior.text} vs {randomWarriorInfo.warrior.text}
        </div>
      </div>

      <div>
        <div>
          <PlayerSummary
            main={true}
            health={selectedWarriorInfo.warrior.hp}
            name={selectedWarriorInfo.warrior.text}
            maxHealth={selectedWarriorInfo.warrior.hp}
          />
        </div>

        <div>
          {!inSequence && turn === 0 && (
            <div>
              <WarMenu
                onAttack={() => setSequence({ mode: 'attack', turn })}
                onDefense={() => setSequence({ mode: 'defense', turn })}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
