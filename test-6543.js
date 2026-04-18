import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';

async function test() {
    const connectionString = "postgresql://postgres.msrheikqjexwxfilftlu:o2pIhPByjPCAZkND@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require";
    const client = new Client({ connectionString });
    console.log('Connecting to port 6543...');
    try {
        await client.connect();
        console.log('Connected!');
        const res = await client.query('SELECT NOW()');
        console.log('Result:', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('Error:', err);
    }
}

test();
