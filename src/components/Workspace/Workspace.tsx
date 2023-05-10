import ReactMarkdown from 'react-markdown';
import { NotesContext } from 'store';
import { ChangeEvent, useContext, useState } from 'react';
import styles from './Workspace.module.scss';

function Workspace({ handleTypeNote }): JSX.Element {
  const notesState = useContext(NotesContext);

  const selectedNote = notesState?.find(({ selected }) => selected);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newText = event.target.value;
    handleTypeNote(selectedNote, newText);
  }

  return (
    <main className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        value={selectedNote?.text}
        onChange={(event) => handleChange(event)}
      />
      <ReactMarkdown>{selectedNote?.text}</ReactMarkdown>
    </main>
  );
}

export default Workspace;
