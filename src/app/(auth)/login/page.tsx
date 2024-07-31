import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth.actions";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LoginPage(){
    const user = await getUser();
    if(user) redirect("/");
    return <div className="">
        <Card className="w-64">
        <CardHeader>Login</CardHeader>
        <CardContent>
            <LoginForm></LoginForm>
        </CardContent>
        <CardFooter>
            <Link href={"/signup"} className="text-accent hover:underline">Create an account instead</Link>
        </CardFooter>
    </Card>
    </div>
}