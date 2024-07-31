import {drizzle} from "drizzle-orm/node-postgres"
import { Client } from "pg"

const client = new Client({
    connectionString: process.env["PG_CONNECTION_STRING"]
})

await client.connect();

export const db = drizzle(client);