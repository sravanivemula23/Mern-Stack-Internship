import styles from "./Card.module.css";

function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
export default Card;
