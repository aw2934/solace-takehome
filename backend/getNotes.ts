import { Request, Response } from 'express';
import client from './dbClient.ts';

const getNotes = (_req: Request, res: Response) => {
  client.query(`
    SELECT * FROM notes
    WHERE deleted = false
  `)
    .then(n => res.status(200).send(n.rows))
    .catch(_ => res.status(500).send('Error'));
};

export default getNotes;
