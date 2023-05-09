import { useContext } from 'react';
import { NotesContext } from 'store';
import { INote } from 'types';
import styles from './Sidebar.module.scss';
import { NotesItem } from '../ui';

function Sidebar() {
  const notesState = useContext(NotesContext);

  return (
    <aside className={styles.wrapper}>
      {notesState?.map((note: INote) => (
        <NotesItem
          key={note.id}
          title={note.text}
          description={note.text}
          date={note.date}
          selected={note.selected}
        />
      ))}
    </aside>
  );
}

export default Sidebar;
