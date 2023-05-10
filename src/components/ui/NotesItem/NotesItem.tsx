import { useFormatDate } from 'hooks';
import clsx from 'clsx';
import { useContext } from 'react';
import { NotesDispatchContext } from 'store';
import { INotesActions } from 'types';
import { NotesItemProps } from './NotesItem.props';
import styles from './NotesItem.module.scss';
import Title from '../Title/Title';

function NotesItem({ id, title, date, description, selected, handleSelectNote }: NotesItemProps) {
  const dispatch = useContext(NotesDispatchContext);

  const noteCache = {
    id,
    description,
    date,
  };

  return (
    <div
      role="button"
      onClick={(noteCache)}
      tabIndex={0}
      className={clsx(styles.wrapper, selected && styles.selected)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleSelectNote(noteCache);
        }
      }}
    >
      <Title className={styles.title} typeTitle="h3" size="s">
        {title || 'Emty note'}
      </Title>
      <div className={styles.info}>
        <p className={styles.date}>{date && useFormatDate(date)}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default NotesItem;
