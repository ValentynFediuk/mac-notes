import ReactMarkdown from 'react-markdown';
import styles from './Workspace.module.scss';

function Workspace(): JSX.Element {
  return (
    <main className={styles.wrapper}>
      {/* <textarea
        className={styles.textarea}
        value={text}
        onChange={handleChange}
      />
      <ReactMarkdown>{text}</ReactMarkdown> */}
    </main>
  );
}

export default Workspace;