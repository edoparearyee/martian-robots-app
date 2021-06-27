import React, { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './TextArea.module.scss';

const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea className={classNames(styles.TextArea, className)} {...props} />
  );
};

export default TextArea;
