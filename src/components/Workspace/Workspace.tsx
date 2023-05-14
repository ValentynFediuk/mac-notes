import ReactMarkdown from 'react-markdown';
import { NotesContext } from 'store';
import { ChangeEvent, useContext } from 'react';
import styles from './Workspace.module.scss';
import { Title } from '../ui';
import { WorkspaceProps } from './Workspace.props';

function Workspace({ handleTypeNote }: WorkspaceProps): JSX.Element {
  const notesState = useContext(NotesContext);

  const selectedNote = notesState?.find(({ selected }) => selected);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newText = event.target.value;
    if (selectedNote) {
      handleTypeNote(selectedNote, newText);
    }
  }

  return (
    <main className={styles.wrapper}>
      {selectedNote && (
        <>
          <Title className={styles.title} typeTitle="h3" size="s">
            {selectedNote?.title || 'New note'}
          </Title>
          {selectedNote?.edit ? (
            <textarea
              placeholder="Type note text"
              wrap="soft"
              className={styles.textarea}
              value={selectedNote?.text}
              onChange={(event) => handleChange(event)}
            />
          ) : (
            <ReactMarkdown className={styles.markdown}>
              {selectedNote?.text}
            </ReactMarkdown>
          )}
        </>
      )}
    </main>
  );
}

export default Workspace;
