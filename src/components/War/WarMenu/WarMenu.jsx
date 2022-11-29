import styles from './styles.module.css';

export const WarMenu = ({ onAttackNear,onAttackFar,onDeffenseNear,onDeffenseFar}) => (
  <div className='d-flex justify-content-center'>
    <div onClick={onAttackNear} className={styles.option}>
      AttackNear
    </div>
    <div onClick={onAttackFar} className={styles.option}>
      AttackFar
    </div>
    <div onClick={onDeffenseNear} className={styles.option}>
    DeffenseNear
    </div>
    <div onClick={onDeffenseFar} className={styles.option}>
      DeffenseFar
    </div>
  </div>
);
