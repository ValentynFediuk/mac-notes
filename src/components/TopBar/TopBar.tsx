import sprite from 'assets/icons/sprite.svg';
import { useContext, useEffect, useState } from 'react';
import { NotesContext, NotesDispatchContext } from 'store';
import { useDebounce } from 'hooks';
import { INote, INotesActions } from 'types';
import { Button, Search } from '../ui';
import styles from './TopBar.module.scss';
import { TopBarProps } from './TopBar.props';

function TopBar({
  handleAddNote,
  handleDeleteNote,
  handleClickEdit,
  notesFromDB,
  fetchNotes,
}: TopBarProps) {
  const notesState = useContext(NotesContext);

  const dispatch = useContext(NotesDispatchContext);

  const selectedNote = notesState?.find(({ selected }) => selected);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await fetchNotes();
    setQuery(event.target.value);
  };

  useEffect(() => {
    const filterData = () => {
      const filtered: INote[] = notesFromDB?.filter((note: INote) =>
        note?.title?.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      if (debouncedQuery === '') {
        const loadFilteredNotes: INotesActions = {
          type: 'LOAD_FILTERED_NOTES',
          payload: { notes: notesFromDB },
        };

        dispatch(loadFilteredNotes);
      }

      const loadFilteredNotes: INotesActions = {
        type: 'LOAD_FILTERED_NOTES',
        payload: { notes: filtered },
      };

      dispatch(loadFilteredNotes);
    };
    filterData();
  }, [debouncedQuery]);

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
            appearance={selectedNote ? 'primary' : 'disabled'}
            typeBtn="button"
          >
            <svg>
              <use href={`${sprite}#recycle-bin`} />
            </svg>
          </Button>
          <Button
            handleClick={handleClickEdit}
            appearance={selectedNote ? 'primary' : 'disabled'}
            typeBtn="button"
          >
            <svg>
              <use href={`${sprite}#edit`} />
            </svg>
          </Button>
        </div>
        <Search
          handleChange={handleInputChange}
          value={query}
          appearance="primary"
          inputType="text"
          placeholder="Search"
        />
      </nav>
    </header>
  );
}

export default TopBar;
