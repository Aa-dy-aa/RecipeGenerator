// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import {config} from 'dotenv'
// config({path:'.env.local'})
// const sql = neon(process.env.DATABASE_URL);
// const db = drizzle(sql );
// export {db}
// 'use server';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Debug log to check if DATABASE_URL is loaded correctly
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export { db };
