// t2/02-crear-taules.js
const { crearConnexio, tancarConnexio } = require('../utils/db');
const SQL_USUARIS = `
    CREATE TABLE IF NOT EXISTS usuaris (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefon VARCHAR(20),
    data_alta DATE NOT NULL DEFAULT (CURRENT_DATE)
    )`;
const SQL_PRESTECS = `
    CREATE TABLE IF NOT EXISTS prestecs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuari_id INT NOT NULL,
    llibre_id INT NOT NULL,
    data_prestec DATE NOT NULL DEFAULT (CURRENT_DATE),
    data_retorn DATE,
    estat ENUM('actiu', 'retornat', 'endarrerit') NOT NULL DEFAULT 'actiu',
    FOREIGN KEY (usuari_id) REFERENCES usuaris(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (llibre_id) REFERENCES llibres(id)
    ON DELETE CASCADE ON UPDATE CASCADE
    )`;
async function crearTaules() {
    let connection;
    try {
        connection = await crearConnexio();
        // L'ordre importa: prestecs fa referència a usuaris i a llibres
        await connection.execute(SQL_USUARIS);
        console.log('✓ Taula usuaris creada');
        await connection.execute(SQL_PRESTECS);
        console.log('✓ Taula prestecs creada');
        const [taules] = await connection.execute('SHOW TABLES');
        console.log('Taules de la base de dades:',
        taules.map((fila) => Object.values(fila)[0]).join(', '));
    } catch (error) {
        console.error('✗ Error creant les taules:', error.code, error.message);
    } finally {
        await tancarConnexio(connection);
    }
}
crearTaules();