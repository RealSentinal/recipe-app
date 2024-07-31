import { Lucia } from "lucia";
import {DrizzlePostgreSQLAdapter} from "@lucia-auth/adapter-drizzle"
import { db } from "../db";
import { userTable, sessionTable } from "../db/schema";
import {cache} from "react"
import { cookies } from "next/headers";
import type {Session, User} from "lucia"

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

interface DatabaseUserAttributes{
    username: string
}

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => ({username: attributes.username})
})

declare module "lucia" {
    interface Register{
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

export const validateRequest = cache(async (): Promise<{user: User, session: Session} | {user:null, session: null}> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if(!sessionId) return {user: null, session: null}
    const result = await lucia.validateSession(sessionId);
    try{
        // there is a new session
        if(result.session && result.session.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id); // create new session cookie
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if(!result.session){ // no session
            const sessionCookie = lucia.createBlankSessionCookie(); // set empty session cookie
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch (err){
        if(err instanceof Error) console.log(err.message);
    }
    return result;
})