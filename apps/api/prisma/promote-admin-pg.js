const { Pool } = require('pg');

const connectionString = 'postgresql://reservation_user:reservation_pass@localhost:5432/reservation_db';
const pool = new Pool({ connectionString });

async function main() {
    const client = await pool.connect();
    try {
        const res = await client.query("UPDATE users SET role = 'ADMIN' WHERE email = 'host@example.com' RETURNING *");
        if (res.rowCount > 0) {
            console.log(`✅ Promoted user ${res.rows[0].email} to ADMIN.`);
        } else {
            console.log('❌ User not found.');
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
