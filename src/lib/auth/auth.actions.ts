"use server"
import { cache } from "react"
import {lucia, validateRequest} from "./index"
import { cookies } from "next/headers";
import { SignupSchema } from "./validations";
import { generateId } from "lucia";
import { db } from "../db";
import { userTable } from "../db/schema";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const getUser = cache(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
})

export async function signup(username: string, password: string){
    username = username.trim();
    if(username===password) return; // username is the same as password
    try {
        const parsed = SignupSchema.parse({username, password});
        const id = generateId(15);
        const hashed_password = await bcrypt.hash(parsed.password, 10)
        await db.insert(userTable).values({id, username: parsed.username, hashed_password});
        const session = await lucia.createSession(id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return redirect("/");
    } catch (error) {
        console.log((error instanceof Error) ? error.message : "Signup failed")
    }
}

export async function login(username: string, password: string){
    username = username.trim();
    try {
        const parsed = SignupSchema.parse({username, password});
        const user = await db.query.userTable.findFirst({where: eq(userTable.username, parsed.username)});
        if(!user) throw new Error("No such user");
        const result = await bcrypt.compare(parsed.password, user.hashed_password);
        if(!result) throw new Error("Invalid password");
        else{
            const session = await lucia.createSession(user.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        console.log((error instanceof Error) ? error.message : "Login failed")
    }
}

export async function logout(){
    const {session} = await validateRequest();
    if(!session) return "Unauthorized"
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}