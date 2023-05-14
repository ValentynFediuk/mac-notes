const DATABESE_NAME = import.meta.env.VITE_X_DATABASE_NAME;

const indexedDBConfig = {
  name: 'NotesBB',
  version: 1,
  objectStoresMeta: [
    {
      store: DATABESE_NAME,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'text', keypath: 'text', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: true } },
        { name: 'selected', keypath: 'selected', options: { unique: true } },
      ],
    },
  ],
};

export { indexedDBConfig, DATABESE_NAME };
