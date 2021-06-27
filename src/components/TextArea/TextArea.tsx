import React, { TextareaHTMLAttributes } from 'react';

import styles from './TextArea.module.scss';

const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  return <textarea className={styles.TextArea} {...props} />
}

export default TextArea;
