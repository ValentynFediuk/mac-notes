import { Title } from '../ui';
import { ListItemProps } from './ListItem.props';
import styles from './ListItem.module.scss';

function ListItem({ title, date, description }: ListItemProps) {
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

export default ListItem;
