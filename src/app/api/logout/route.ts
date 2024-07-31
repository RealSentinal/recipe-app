import { logout } from "@/lib/auth/auth.actions";

export async function GET(){
    await logout();
}