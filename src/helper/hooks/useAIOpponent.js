import { useEffect, useState } from 'react';

export const useAIOpponent = turn => {
  const [aiChoice, setAIChoice] = useState('');

  useEffect(() => {
    if (turn === 1) {
      // const options = ['attack', 'deffense'];
      const options = ['attackFar', 'attackNear','deffenseFar', 'deffenseNear'];
      setAIChoice(options[Math.floor(Math.random() * options.length)]);
    }
  }, [turn]);

  return aiChoice;
};
