import React, { FormEvent, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import styles from './App.module.scss';
import Input from './components/Input/Input';
import Output from './components/Output/Output';
import { parseInput } from './utils/parseInput';
import { runRobotCommands } from './utils/runRobotCommands';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>();
  const [error, setError] = useState<string>();

  const onChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
    setOutput(undefined);
    setError(undefined);
  };

  const onReset = () => {
    setOutput(undefined);
    setError(undefined);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const gridSizeAndInstructions = parseInput(input);
      if (!gridSizeAndInstructions) return;

      const { gridSize, robotInstructions } = gridSizeAndInstructions;
      const result = runRobotCommands(gridSize, robotInstructions);
      setOutput(result);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className={styles.App}>
      <h1 className={styles.App__h1}>Martian Robots</h1>
      <Container>
        <Row>
          <Col sm={6}>
            <Input
              onSubmit={onSubmit}
              onChange={onChange}
              onReset={onReset}
              error={error}
            />
          </Col>
          <Col sm={6}>
            <Output value={output} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default App;
