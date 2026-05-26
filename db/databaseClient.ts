import { Client } from 'pg';

export class DatabaseClient {

    private client: Client;

    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    async connect() {
        await this.client.connect();
        console.log('Database Connected');
    }

    async getUserById(id: number) {
        const result = await this.client.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    async createUser(name: string, email: string) {
        const result = await this.client.query(
            `INSERT INTO users(name, email)
             VALUES ($1, $2)
             RETURNING *`,
            [name, email]
        );
        return result.rows[0];
    }

    async deleteUser(id: number) {
        await this.client.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        );
    }

    async disconnect() {
        await this.client.end();
        console.log('Database Disconnected');
    }

    async beginTransaction() {
        await this.client.query('BEGIN');
    }

    async commitTransaction() {
        await this.client.query('COMMIT');
    }

    async rollbackTransaction() {
        await this.client.query('ROLLBACK');
    }
}
