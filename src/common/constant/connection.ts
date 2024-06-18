export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DB_NAME: string;
};

export const connection: Connection = {
  CONNECTION_STRING: 'localhost',
  DB: 'MYSQL',
  DB_NAME: 'TEST',
};
