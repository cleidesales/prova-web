import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'avaliacao_web2'}`);
        console.log(`Banco de dados '${process.env.DB_NAME || 'avaliacao_web2'}' criado ou já existente!`);
        await connection.end();
    } catch (error) {
        console.error('Erro ao criar banco de dados:', error);
    }
}

createDatabase();
