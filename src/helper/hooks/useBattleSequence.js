import { useContext, useEffect, useState } from 'react';
import { wait } from '../index';
import { WarriorContext } from '../../contexts/WarriorContext';

export const useBattleSequence = sequence => {
  const {randomWarriorInfo,selectedWarriorInfo,attackNearFunc,
    attackFarFunc,
    deffenseNearFunc,
    deffenseFarFunc } = useContext(WarriorContext);
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(selectedWarriorInfo.warrior.hp);
  const [opponentHealth, setOpponentHealth] = useState(randomWarriorInfo.warrior.hp);

  const [announcerMessage, setAnnouncerMessage] = useState('');

  const [playerAnimation, setPlayerAnimation] = useState('static');
  const [opponentAnimation, setOpponentAnimation] = useState('static');

  useEffect(() => {
    const { mode, turn } = sequence;

    if (mode) {
      const attacker = turn === 0 ? selectedWarriorInfo.warrior : randomWarriorInfo.warrior;
      const receiver = turn === 0 ? randomWarriorInfo.warrior : selectedWarriorInfo.warrior;

      switch (mode) {
        case 'attackFar': {
          const damage = attackFarFunc({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.text} has chosen to attack!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('attack')
              : setOpponentAnimation('attack');
            await wait(100);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500);

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(750);

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static');
            setAnnouncerMessage(`${receiver.text} felt that!`);
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2000);

            setAnnouncerMessage(`Now it's ${receiver.text} turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }
        case 'attackNear': {
          const damage = attackNearFunc({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.text} has chosen to attack!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('attack')
              : setOpponentAnimation('attack');
            await wait(100);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500);

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(750);

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static');
            setAnnouncerMessage(`${receiver.text} felt that!`);
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2000);

            setAnnouncerMessage(`Now it's ${receiver.text} turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'deffenseFar': {
          const damage = deffenseFarFunc({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.text} has cast a spell!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500);

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(750);

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static');
            setAnnouncerMessage(
              `${receiver.text} doesn't know what hit them!`,
            );
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2500);

            // setAnnouncerMessage(`Now it's ${receiver.text}'s turn!`);
            // await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'deffenseNear': {
          const damage = deffenseNearFunc({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.text} has cast a spell!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500);

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(750);

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static');
            setAnnouncerMessage(
              `${receiver.text} doesn't know what hit them!`,
            );
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2500);

            // setAnnouncerMessage(`Now it's ${receiver.text}'s turn!`);
            // await wait(1500);

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
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  };
};
