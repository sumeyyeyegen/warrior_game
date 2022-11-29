import { Bar } from '../../Bar/Bar';
import styles from './styles.module.css';

export const PlayerSummary = ({
  health,
  maxHealth,
}) => (
  <div
    className={styles.main}
  >

    <div className={styles.health}>
      <Bar label="HP" value={health} maxValue={maxHealth} />
    </div>
  </div>
);
