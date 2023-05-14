import clsx from 'clsx';
import { TitleProps } from './Title.props';
import styles from './Title.module.scss';

function Title({ children, size, typeTitle, className }: TitleProps) {
  const classNameBuilder = clsx(styles.title, className, {
    [styles.s]: size === 's',
    [styles.m]: size === 'm',
    [styles.l]: size === 'l',
  });

  const titleBuilder = () => {
    switch (typeTitle) {
      case 'h1':
        return <h1 className={classNameBuilder}>{children}</h1>;
      case 'h2':
        return <h2 className={classNameBuilder}>{children}</h2>;
      case 'h3':
        return <h3 className={classNameBuilder}>{children}</h3>;
      default:
        return <h1 className={classNameBuilder}>{children}</h1>;
    }
  };

  return titleBuilder();
}

export default Title;
