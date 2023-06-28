import { config } from 'dotenv';
import pg from 'pg';

config();

const client = new pg.Client(
  `postgres://ufhakgtm:${process.env.POSTGRES_SECRET}@mahmud.db.elephantsql.com/ufhakgtm`
);

client.connect();

export default client;
