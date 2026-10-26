// t2/01-ampliar-llibres.js
const { crearConnexio, tancarConnexio } = require('../utils/db');
async function ampliarLlibres() {
    let connection;
    try {
        connection = await crearConnexio();
        // ALTER TABLE modifica una taula existent sense perdre'n les dades
        await connection.execute(`
        ALTER TABLE llibres
        ADD COLUMN IF NOT EXISTS isbn VARCHAR(20) UNIQUE,
        ADD COLUMN IF NOT EXISTS editorial VARCHAR(100),
        ADD COLUMN IF NOT EXISTS exemplars_disponibles INT NOT NULL DEFAULT 1,
        ADD CONSTRAINT IF NOT EXISTS chk_exemplars
        CHECK (exemplars_disponibles >= 0)
        `);
        console.log('✓ Taula llibres ampliada\n');
        // Comprovem com ha quedat l'estructura
        const [columnes] = await connection.execute('DESCRIBE llibres');
        for (const { Field, Type, Null, Default } of columnes) {
            console.log(` ${Field.padEnd(22)}${Type.padEnd(13)} ${Null} ${Default}`);
        }
    } catch (error) {
        console.error('✗ Error ampliant la taula llibres:', error.message);
    } finally {
        await tancarConnexio(connection);
    }
}
ampliarLlibres();