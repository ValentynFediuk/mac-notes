import sprite from 'assets/icons/sprite.svg';
import { useReducer } from 'react';
import { NotesReducer } from 'store';
import { INotesActions } from 'types';
import { Button, Search } from '../ui';
import styles from './TopBar.module.scss';

function TopBar() {
  const [notes, dispatch] = useReducer(NotesReducer, []);

  function handleAddNote() {
    const newNote = { id: 1, text: 'New note', date: new Date() };
    const action: INotesActions = {
      type: 'ADD_NOTE',
      payload: { note: newNote },
    };
    dispatch(action);
  }
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
