import { useContext } from 'react';
import { NotesContext } from 'store';
import { INote } from 'types';
import styles from './Sidebar.module.scss';
import { NotesItem } from '../ui';

function Sidebar({handleSelectNote}): JSX.Element {
  const notesState = useContext(NotesContext);

  return (
    <aside className={styles.wrapper}>
      {notesState?.map((note: INote) => (
        <NotesItem
          key={note?.id}
          id={note?.id}
          title={note?.text}
          description={note?.text}
          date={note?.date}
          selected={note?.selected}
          handleSelectNote={handleSelectNote}
        />
      ))}
    </aside>
  );
}

export default Sidebar;
