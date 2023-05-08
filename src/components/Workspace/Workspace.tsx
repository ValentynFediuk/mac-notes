import ReactMarkdown from 'react-markdown';
import { useState, ChangeEvent, useEffect } from 'react';
import styles from './Workspace.module.scss';

interface MyObject {
  id?: number;
  value: string;
}

function Workspace(): JSX.Element {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [dbValue, setDbValue] = useState<string>('');
  const [text, setText] = useState<string>('');

  useEffect(() => {
    // create an instance of the IndexedDB database
    const request = window.indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore('myObjectStore', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };

    request.onsuccess = (event) => {
      const db = event.target.result as IDBDatabase;
      setDb(db);

      // retrieve any previously stored data from IndexedDB
      const transaction = db.transaction(['myObjectStore'], 'readonly');
      const objectStore = transaction.objectStore('myObjectStore');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        const values: MyObject[] = event.target.result;
        if (values.length > 0) {
          setDbValue(values[values.length - 1].value); // set the value of the most recently added object
        }
      };

      transaction.onerror = (event) => {
        console.error('Transaction error', event.target.error);
      };
    };

    request.onerror = (event) => {
      console.error('Database error', event.target.error);
    };
  }, []);

  const handleGetButtonClick = () => {
    if (db === null) return;

    const transaction = db.transaction(['myObjectStore'], 'readonly');
    const objectStore = transaction.objectStore('myObjectStore');
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const values: MyObject[] = event.target.result;
      if (values.length > 0) {
        console.log(values[values.length - 1].value);
        setText(values[values.length - 1].value); // set the
      } else {
        setText('No values found');
      }
    };
  };

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setText(event.target.value);

    const transaction = db.transaction(['myObjectStore'], 'readwrite');
    const objectStore = transaction.objectStore('myObjectStore');
    const newItem: MyObject = { value: text };
    const request = objectStore.add(newItem);

    request.onsuccess = (event) => {
      console.log('Value added to IndexedDB');
    };

    transaction.oncomplete = (event) => {
      console.log('Transaction completed');
    };

    transaction.onerror = (event) => {
      console.error('Transaction error', event.target.error);
    };
  }

  return (
    <main className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(event)
        }
      />
      <ReactMarkdown>{text}</ReactMarkdown>
    </main>
  );
}

export default Workspace;
