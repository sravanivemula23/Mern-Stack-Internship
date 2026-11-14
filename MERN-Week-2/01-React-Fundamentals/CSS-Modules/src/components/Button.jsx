import styles from "./Button.module.css";

// Combine two module classes with a template string.
function Button({ children, variant = "primary", onClick }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
