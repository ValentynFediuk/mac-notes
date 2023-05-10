import sprite from 'assets/icons/sprite.svg';
import { Button, Search } from '../ui';
import styles from './TopBar.module.scss';

function TopBar({ handleAddNote, handleDeleteNote, handleEditNote }: ITopBar) {
  return (
    <header className={styles.wrapper}>
      <nav>
        <div className={styles.buttons}>
          <Button
            handleClick={handleAddNote}
            appearance="primary"
            typeBtn="button"
          >
            <svg>
              <use href={`${sprite}#plus`} />
            </svg>
          </Button>
          <Button
            handleClick={handleDeleteNote}
            appearance="primary"
            typeBtn="button"
          >
            <svg>
              <use href={`${sprite}#recycle-bin`} />
            </svg>
          </Button>
          <Button
            handleClick={handleEditNote}
            appearance="primary"
            typeBtn="button"
          >
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
