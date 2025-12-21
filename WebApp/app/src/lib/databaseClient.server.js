import knexLib from 'knex';
import { POSTGRES_CONNECTION_STRING } from '$env/static/private';

export const knex = knexLib({
    client: 'pg',
    connection: { 
        connectionString: POSTGRES_CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: true,
        },
    },
    searchPath: ['knex', 'public']
});