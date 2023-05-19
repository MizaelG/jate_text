import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readwrite');
const store = tx.objetStore('jate');
const request = store.add({ id: 1, value: content });
const result = await request;

console.log('Data successfully save to jate', result);

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get all from jatDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objetStore('jate');
  const request = store.getAll(1);
  const result = await request;
  console.log('Data successfully pulled from jateDB', result);
}

initdb();
