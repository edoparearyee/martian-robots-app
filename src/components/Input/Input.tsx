import React, { FormEvent } from 'react';

import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';

import styles from './Input.module.scss';

interface InputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
  onReset: () => void;
  error?: string;
}

const Form: React.FC<InputProps> = ({ onSubmit, onChange, onReset, error }) => (
  <form className={styles.Input} onSubmit={onSubmit}>
    <label className={styles.Input__label} htmlFor="instructions">
      Enter instructions
    </label>
    <TextArea
      className={styles['Input__label--error']}
      id="instructions"
      name="instructions"
      autoFocus
      onChange={onChange}
    />
    <div>
      <Button>Submit</Button>
      <Button type="reset" onClick={onReset}>
        Clear
      </Button>
    </div>
    {error && (
      <div
        className={styles.Input__errorMessage}
        role="alert"
        aria-live="assertive"
      >
        <p>{error}</p>
      </div>
    )}
  </form>
);

export default Form;
