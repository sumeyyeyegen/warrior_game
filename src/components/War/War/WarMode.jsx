import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { useAIOpponent } from '../../../helper/hooks/useAIOpponent';
import { useBattleSequence } from '../../../helper/hooks/useBattleSequence';
import { WarMenu } from '../WarMenu/WarMenu';
import { PlayerSummary } from '../PlayerSummary/PlayerSummary';
import { wait } from '../../../helper';
import { WarriorContext } from '../../../contexts/WarriorContext';

export const WarMode = ({ onGameEnd }) => {
  const {randomWarriorInfo,selectedWarriorInfo} = useContext(WarriorContext);
  const [sequence, setSequence] = useState({});

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
    if (playerHealth === 0 || opponentHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? randomWarriorInfo.warrior : selectedWarriorInfo.warrior);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);

  return (
    <>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          <div>{selectedWarriorInfo.warrior.text}</div> vs <div>{randomWarriorInfo.warrior.text}</div>
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              alt={selectedWarriorInfo.warrior.text}
              src={require("../../../assets/megaman.png")}
              className={styles[playerAnimation]}
            />
          </div>
          <div className={styles.opponentSprite}>
            <img
              alt={randomWarriorInfo.warrior.text}
              src={require("../../../assets/samus.png")}
              className={styles[opponentAnimation]}
            />
          </div>
        </div>
      </div>

      <div className={styles.user}>
        <div className='d-flex justify-content-between'>
          <div className={styles.summary}>
            <PlayerSummary
              main={true}
              health={playerHealth}
              name={selectedWarriorInfo.warrior.text}
              maxHealth={selectedWarriorInfo.warrior.maxHP}
            />
          </div>
          {/* <div className={styles.opponent}> */}
          <div className={styles.summary}>
            <PlayerSummary
              main={false}
              health={opponentHealth}
              name={randomWarriorInfo.warrior.text}
              maxHealth={randomWarriorInfo.warrior.maxHP}
            />
          </div>
        </div>
      {/* </div> */}
          {!inSequence && turn === 0 && (
            <div className={styles.hudChild}>
              <WarMenu
                onAttackNear={() => setSequence({ mode: 'attackNear', turn })}
                onAttackFar={() => setSequence({ mode: 'attackFar', turn })}
                onDeffenseNear={() => setSequence({ mode: 'deffenseNear', turn })}
                onDeffenseFar={() => setSequence({ mode: 'deffenseFar', turn })}
              />
            </div>
          )}
      </div>
    </>
  );
};
