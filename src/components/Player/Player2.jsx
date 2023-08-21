import styles from './Player.module.scss';

function Player({ name, rollValue, onRoll }) {
  return (
    <div className={styles.player}>
      <h2>{name}</h2>
      <div>
        Rolled: {rollValue}
      </div>
    </div>
  );
}

export default Player;
