import sprite from 'assets/icons/sprite.svg';
import { Button, Search } from '../ui';
import styles from './TopBar.module.scss';

function TopBar() {
  return (
    <header className={styles.wrapper}>
      <nav>
        <div className={styles.buttons}>
          <Button appearance="primary" typeBtn="button">
            <svg>
              <use href={`${sprite}#plus`} />
            </svg>
          </Button>
          <Button appearance="primary" typeBtn="button">
            <svg>
              <use href={`${sprite}#recycle-bin`} />
            </svg>
          </Button>
          <Button appearance="primary" typeBtn="button">
            <svg>
              <use href={`${sprite}#edit`} />
            </svg>
          </Button>
        </div>
        <Search appearance="primary" inputType="text" placeholder="Search" />
      </nav>
    </header>
  );
}

export default TopBar;
