import styles from './Dice.module.scss';

function Dice({ value }) {

    const renderDots = (num) => {
      let dots = [];
      for (let i = 0; i < num; i++) {
        dots.push(<div key={i} className={styles.dot}></div>);
      }
      return dots;
    }
  
    return (
      <div className={styles.dicecontainer}>
      <div className={styles.dice}>
        <div className={`${styles.face} ${value === 1 ? styles.active : ''} ${styles.one}`}>{renderDots(1)}</div>
        <div className={`${styles.face} ${value === 2 ? styles.active : ''} ${styles.two}`}>{renderDots(2)}</div>
        <div className={`${styles.face} ${value === 3 ? styles.active : ''} ${styles.three}`}>{renderDots(3)}</div>
        <div className={`${styles.face} ${value === 4 ? styles.active : ''} ${styles.four}`}>{renderDots(4)}</div>
        <div className={`${styles.face} ${value === 5 ? styles.active : ''} ${styles.five}`}>{renderDots(5)}</div>
        <div className={`${styles.face} ${value === 6 ? styles.active : ''} ${styles.six}`}>{renderDots(6)}</div>
      </div>
      </div>
    );
}

export default Dice;
