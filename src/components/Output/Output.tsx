import React from 'react';

import styles from './Output.module.scss';

interface OutputProps {
  value?: string;
}

const Output: React.FC<OutputProps> = ({ value }) => (
  <>
    <h2 className={styles.Output__h2}>Output</h2>
    <pre className={styles.Output} data-testid="output">
      {value?.length && value}
    </pre>
  </>
);

export default Output;
