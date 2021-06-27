import React, { FormEvent, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import styles from './App.module.scss';
import Input from './components/Input/Input';
import Output from './components/Output/Output';

const App: React.FC = () => {
  const [output, setOutput] = useState<string>();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  }

  return (
    <main className={styles.App}>
      <h1 className={styles.App__h1}>Martian Robots</h1>
      <Container>
        <Row>
          <Col sm={6}>
            <Input onSubmit={onSubmit} />
          </Col>
          <Col sm={6}>
            <Output value={output}/>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default App;
