import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';

async function test(label, connectionString) {
    console.log(`\n--- Testing ${label} ---`);
    console.log('Connecting to:', connectionString.replace(/:[^:@]+@/, ':****@'));
    const client = new Client({ connectionString });
    try {
        const start = Date.now();
        await client.connect();
        console.log(`Connected in ${Date.now() - start}ms`);
        const res = await client.query('SELECT version()');
        console.log('Success:', res.rows[0].version.substring(0, 50));
        await client.end();
    } catch (err) {
        console.error('FAILED:', err.message);
    }
}

async function run() {
    // Test 1: Direct Connection (Port 5432) - Usually IPv6 only
    await test('Direct Host (5432)', `postgresql://postgres.msrheikqjexwxfilftlu:o2pIhPByjPCAZkND@db.msrheikqjexwxfilftlu.supabase.co:5432/postgres?sslmode=require`);

    // Test 2: Pooler Session Mode (Port 5432) - IPv4 compatible
    await test('Pooler Session (5432)', `postgresql://postgres.msrheikqjexwxfilftlu:o2pIhPByjPCAZkND@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require`);

    // Test 3: Pooler Transaction Mode (Port 6543) - IPv4 compatible
    await test('Pooler Transaction (6543)', `postgresql://postgres.msrheikqjexwxfilftlu:o2pIhPByjPCAZkND@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require`);
}

run();
