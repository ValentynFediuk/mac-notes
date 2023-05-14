import { useContext } from 'react';
import { NotesContext } from 'store';
import { INote } from 'types';
import styles from './Sidebar.module.scss';
import { NotesItem } from '../ui';
import { SidebarProps } from './Sidebar.props';

function Sidebar({
  handleSelectNote,
  handleTypeNoteTitle,
}: SidebarProps): JSX.Element {
  const notesState = useContext(NotesContext);

  return (
    <aside className={styles.wrapper}>
      {notesState?.map((note: INote) => (
        <NotesItem
          key={note?.id}
          id={note?.id}
          title={note?.title}
          text={note?.text}
          date={note?.date}
          selected={note?.selected}
          edit={note?.edit}
          handleSelectNote={handleSelectNote}
          handleTypeNoteTitle={handleTypeNoteTitle}
        />
      ))}
    </aside>
  );
}

export default Sidebar;
