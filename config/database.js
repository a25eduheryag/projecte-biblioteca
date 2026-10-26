// config/database.js
// Configuració adaptada per a MySQL en Docker (T0)
const dbConfig = {
    host: '127.0.0.1', // El teu ordinador (millor que 'localhost')
    port: 3306,
    user: 'nodeuser', // Usuari creat al T0
    password: 'nodepass',
    database: 'biblioteca',
    timezone: 'Z', // El servidor treballa en hora UTC
    dateStrings: ['DATE'] // Les columnes DATE arriben com a 'AAAA-MM-DD'
};
module.exports = dbConfig;