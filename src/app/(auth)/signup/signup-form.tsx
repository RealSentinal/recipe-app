"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signup } from "@/lib/auth/auth.actions"
import {useForm, SubmitHandler} from "react-hook-form"

interface ISignupFormInput{
    username: string,
    password: string,
    confirmPassword: string
}

export function SignupForm(){
    const {register, handleSubmit} = useForm<ISignupFormInput>();
    const onsubmit: SubmitHandler<ISignupFormInput> = (data) => {
        if(data.password === data.confirmPassword){
            signup(data.username, data.password);
        }
    }

    return <form className="flex flex-col gap-2" onSubmit={handleSubmit(onsubmit)}>
        <Input {...register("username", {minLength: 2, maxLength: 64, required: true})} placeholder="Username"></Input>
        <Input {...register("password", {minLength: 8, maxLength: 120, required: true})} type="password" placeholder="Password"></Input>
        <Input {...register("confirmPassword", {minLength: 8, maxLength: 120, required: true})} type="password" placeholder="Confirm password"></Input>
        <Button>Login</Button>
    </form>
}