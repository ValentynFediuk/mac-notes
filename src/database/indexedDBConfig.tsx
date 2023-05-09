const DBConfig = {
  name: 'NotesBB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'notes-test',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'text', keypath: 'text', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: true } },
      ],
    },
  ],
};

export default DBConfig;
