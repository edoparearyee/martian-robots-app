import React, { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button className={styles.Button} {...props} />;
};

export default Button;
