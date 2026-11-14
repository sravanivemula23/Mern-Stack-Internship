import Card from "./components/Card";
import Alert from "./components/Alert";
import Button from "./components/Button";
import GlobalBox from "./components/GlobalBox";
import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.container}>
      <h1>CSS Modules Demo</h1>
      <p className={styles.intro}>
        Card, Alert and the global box all use a class named <code>.title</code>.
        Card (indigo) and Alert (red) keep their own colors because CSS Modules scope each
        class to its component. Only the plain global stylesheet (green) is shared globally.
      </p>
      <div className={styles.grid}>
        <Card title="Card (module)">Styled by Card.module.css</Card>
        <Alert title="Alert (module)">Styled by Alert.module.css</Alert>
        <GlobalBox />
      </div>
      <div className={styles.actions}>
        <Button>Primary</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </main>
  );
}
export default App;
