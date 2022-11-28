import { Bar } from '../../components/Bar/Bar';

const red = '#821400';
const blue = '#1953cb';

export const PlayerSummary = ({
  main,
  name,
  level,
  health,
  maxHealth,
}) => (
  <div>
    <div>
      <div>{name}</div>
    </div>

    <div>
      <Bar label="HP" value={health} maxValue={maxHealth} />
    </div>
  </div>
);
