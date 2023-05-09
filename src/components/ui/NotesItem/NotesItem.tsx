import { useFormatDate } from 'hooks';
import clsx from 'clsx';
import { NotesItemProps } from './NotesItem.props';
import styles from './NotesItem.module.scss';
import Title from '../Title/Title';

function NotesItem({ title, date, description, selected }: NotesItemProps) {
  return (
    <div className={clsx(styles.wrapper, selected && styles.selected)}>
      <Title className={styles.title} typeTitle="h3" size="s">
        {title || 'Emty note'}
      </Title>
      <div className={styles.info}>
        <p className={styles.date}>{date &&useFormatDate(date)}</p>
        <p className={styles.description}>{description && description}</p>
      </div>
    </div>
  );
}

export default NotesItem;
