import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth.actions";
import { redirect } from "next/navigation";
import { SignupForm } from "./signup-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SignupPage(){
    const user = await getUser();
    if(user) redirect("/");
    return <div className="">
        <Card className="w-64">
        <CardHeader>Create account</CardHeader>
        <CardContent>
            <SignupForm></SignupForm>
        </CardContent>
        <CardFooter>
            <Link href={"/login"} className="text-accent hover:underline">Sign in instead</Link>
        </CardFooter>
    </Card>
    </div>
}