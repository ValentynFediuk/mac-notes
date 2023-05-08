import clsx from 'clsx';
import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

function Button({ children, typeBtn, appearance, handleClick }: ButtonProps) {
  return (
    <button
      type={typeBtn === 'submit' ? 'submit' : 'button'}
      className={clsx(styles.btn, {
        [styles.primary]: appearance === 'primary',
      })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
