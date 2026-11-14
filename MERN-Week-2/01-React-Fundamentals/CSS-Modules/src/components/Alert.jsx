import styles from "./Alert.module.css";

function Alert({ title, children }) {
  return (
    <div className={styles.alert}>
      <h3 className={styles.title}>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
export default Alert;
