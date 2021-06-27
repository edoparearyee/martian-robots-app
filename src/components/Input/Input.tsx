import React, { FormEvent } from 'react';

import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';

import styles from './Input.module.scss';

interface InputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<InputProps> = ({ onSubmit }) => (
  <form className={styles.Input} onSubmit={onSubmit}>
    <label className={styles.Input__label} htmlFor="instructions">
      Enter instructions
    </label>
    <TextArea id="instructions" name="instructions" autoFocus />
    <Button>Submit</Button>
    <Button type="reset">Clear</Button>
  </form>
);

export default Form;
