import knexLib from 'knex';
import { POSTGRES_CONNECTION_STRING } from '$env/static/private';

export const knex = knexLib({
    client: 'pg',
    connection: POSTGRES_CONNECTION_STRING,
    searchPath: ['knex', 'public']
});