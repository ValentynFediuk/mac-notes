import { Title } from '../index';
import { NotesItemProps } from './NotesItem.props';
import styles from './NotesItem.module.scss';

function NotesItem({ title, date, description }: NotesItemProps) {
  return (
    <div className={styles.wrapper}>
      <Title className={styles.title} typeTitle="h3" size="s">
        {title}
      </Title>
      <div className={styles.info}>
        <p className={styles.date}>{date}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default NotesItem;
