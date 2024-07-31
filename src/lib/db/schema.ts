import { pgTable, text, timestamp, varchar, makePgArray, json, bigint } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    username: varchar("username", {length: 64}).notNull(),
    hashed_password: text("hashed_password").notNull(),
    saved_recipes: text("saved_recipes").array()
})

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userID: text("user_id").notNull().references(()=>userTable.id),
    expiresAt: timestamp("expires_at", {withTimezone: true, mode: "date"}).notNull()
})

export const recipesTable = pgTable("recipes", {
    id: text("id").primaryKey(),
    title: text("title"),
    authorID: text("author_id").references(()=>userTable.id),
    content: json("content"),
    viewCount: bigint("views", {mode: "bigint"}),
    likeCount: bigint("likes", {mode: "bigint"}),
})

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;
export type Session = typeof userTable.$inferSelect;
export type NewSession = typeof userTable.$inferInsert;
export type Recipe = typeof userTable.$inferSelect;
export type NewRecipe = typeof userTable.$inferInsert;