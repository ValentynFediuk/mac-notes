import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.scss';

function Sidebar({ children }: SidebarProps) {
  return <aside className={styles.wrapper}>{children}</aside>;
}

export default Sidebar;
