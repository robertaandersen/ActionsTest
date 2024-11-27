// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import { mylib } from 'mylib';
export function App() {
  return (
    <div>
      <NxWelcome title="myapp" />
      <h1>Welcome to {mylib()}!</h1>
    </div>
  );
}

export default App;
