import express from 'express';

import client from './dbClient.ts';
import getNotes from './getNotes.ts';

const PORT = 3000

const app = express()
app.use(express.json());

app.get('/notes', getNotes);

app.post(
  '/notes', (req, res, next) => {
    const { body } = req;
    client.query(`
      INSERT INTO notes(note)
      VALUES ($1)
    `, [body.note])
    .then(() => next())
    .catch(_ => res.status(500).send('Error'));
  },
  getNotes
);

app.put(
  '/notes', (req, res, next) => {
    const { body } = req;
    client.query(`
      UPDATE notes
      SET note = $1
      WHERE id = $2
    `, [body.note, body.id])
    .then(() => next())
    .catch(_ => res.status(500).send('Error'));
  },
  getNotes
);

// implemented as soft deletion
app.delete(
  '/notes', (req, res, next) => {
    const { body } = req;
    client.query(`
      UPDATE notes
      SET deleted = true
      WHERE id = $1
    `, [body.id])
    .then(() => next())
    .catch(_ => res.status(500).send('Error'));
  },
  getNotes
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});
