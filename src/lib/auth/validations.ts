import {z} from "zod";

export const UsernameSchema = z.string()
.min(2, "Username too short")
.max(64, "Username too long")
.regex(/^[a-zA-Z0-9_]+$/, "Username contains invalid characters")

export const PasswordSchema = z.string()
.min(8, "Password too short")
.max(120, "Password too long")

export const SignupSchema = z.object({
    username: UsernameSchema,

    password: PasswordSchema
})