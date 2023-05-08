import clsx from 'clsx';
import { SearchProps } from './Search.props';
import styles from './Search.module.scss';

function Search({
  placeholder,
  inputType,
  appearance,
  value,
  handleChange,
}: SearchProps) {
  return (
    <input
      type={inputType}
      className={clsx(styles.search, {
        [styles.primary]: appearance === 'primary',
      })}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

export default Search;
