import { Workspace, TopBar, Sidebar, ListItem } from 'components';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
    <div className={styles.wrapper}>
      <TopBar />
      <Sidebar>
        <ListItem title="title" date="date" description="description" />
        <ListItem title="title" date="date" description="description" />
        <ListItem title="title" date="date" description="description" />
      </Sidebar>
      <Workspace />
    </div>
  );
}

export default MainPage;
