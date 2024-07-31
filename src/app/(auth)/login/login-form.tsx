"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/lib/auth/auth.actions";
import { SubmitHandler, useForm } from "react-hook-form";

interface ILoginFormInput{
    username: string,
    password: string,
}

export function LoginForm(){
    const {register, handleSubmit} = useForm<ILoginFormInput>();
    const onsubmit: SubmitHandler<ILoginFormInput> = (data) => {
        login(data.username, data.password);
    }
    return <form className="flex flex-col gap-2" onSubmit={handleSubmit(onsubmit)}>
        <Input {...register("username", {minLength: 2, maxLength: 64, required: true})} placeholder="Username"></Input>
        <Input {...register("password", {minLength: 8, maxLength: 120, required: true})} type="password" placeholder="Password"></Input>
        <Button>Login</Button>
    </form>
}