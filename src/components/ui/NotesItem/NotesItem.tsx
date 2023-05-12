import { useFormatDate } from 'hooks';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { NotesItemProps } from './NotesItem.props';
import styles from './NotesItem.module.scss';
import Title from '../Title/Title';

function NotesItem({
  id,
  title,
  text,
  date,
  selected,
  edit,
  handleSelectNote,
  handleTypeNoteTitle,
}: NotesItemProps) {
  const formattedDate = useFormatDate(date);

  function handleClick() {
    handleSelectNote({
      id,
      title,
      text,
      date,
      selected: true,
      edit,
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const note = {
      id,
      title,
      text,
      date,
      selected,
      edit,
    };

    const newValue = event.target.value;
    handleTypeNoteTitle(note, newValue);
  }

  return (
    <div
      role="button"
      onClick={handleClick}
      tabIndex={0}
      className={clsx(styles.wrapper, selected && styles.selected)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleClick();
        }
      }}
    >
      <Title className={styles.title} typeTitle="h3" size="s">
        {title || 'Emty note'}
      </Title>
      {edit && (
        <input
          onChange={(event) => handleChange(event)}
          value={title}
          type="text"
        />
      )}

      <div className={styles.info}>
        {date && <p className={styles.date}>{formattedDate}</p>}
        <p className={styles.description}>{text}</p>
      </div>
    </div>
  );
}

export default NotesItem;
