// utils/db.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');
/**
* Crea una nova connexió a la BD
*/
async function crearConnexio() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('✓ Connexió establerta');
        return connection;
    } catch (error) {
        console.error('✗ Error:', error.message);
        throw error;
    }
}

async function verificarConnexio() {
    try{
        await connection.ping();
        return true;
    }catch (error){
        return false;
    }
}
/**
* Tanca una connexió de forma segura
*/
async function tancarConnexio(connection) {
    if (connection) {
        await connection.end();
        console.log('✓ Connexió tancada');
    }
}
module.exports = {
    crearConnexio,
    tancarConnexio,
    verificarConnexio
};