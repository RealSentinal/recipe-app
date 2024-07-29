import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ComponentDemo(){
    return <main className="[&>div]:m-4 text-foreground bg-background">
        <Card className="border-border border bg-background-2 rounded-2xl w-96 gap-3 drop-shadow-lg float-left">
            <CardHeader>
            <h1 className="text-2xl">Colors</h1>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 p-2">
                <div className="h-12 bg-background flex justify-center items-center rounded-[8px_8px_0px_0px]">Background</div>
                <div className="h-12 bg-background-2 flex justify-center items-center">Background 2</div>
                <div className="h-12 bg-background-3 flex justify-center items-center">Background 3</div>
                <div className="h-12 bg-background-4 flex justify-center items-center">Background 4</div>
                <div className="h-12 bg-card flex justify-center items-center">Card</div>
                <div className="h-12 bg-popover flex justify-center items-center">Popover</div>
                <div className="h-12 bg-muted flex justify-center items-center">Muted</div>
                <div className="h-12 bg-border flex justify-center items-center">Border</div>
                <div className="h-12 bg-primary flex justify-center items-center">Primary</div>
                <div className="h-12 bg-accent flex justify-center items-center">Accent</div>
                <div className="h-12 bg-destructive flex justify-center items-center rounded-[0px_0px_8px_8px]">Destructive</div>
            </CardContent>
        </Card>
        <Card className="border-border border bg-background-2 rounded-2xl w-96 gap-3 drop-shadow-xl float-left">
            <CardHeader>
            <h1 className="text-2xl">Buttons</h1>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 [&>button]:rounded-full">
                <Button variant={"default"}>Default</Button>
                <Button variant={"destructive"}>Destructive</Button>
                <Button variant={"ghost"}>Ghost</Button>
                <Button variant={"link"}>Link</Button>
                <Button variant={"outline"}>Outline</Button>
                <Button variant={"secondary"}>Secondary</Button>
            </CardContent>
        </Card>
        <Card className="border-border border bg-background-2 rounded-2xl w-96 gap-3 drop-shadow-xl float-left">
            <CardHeader>
            <h1 className="text-2xl">Form</h1>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Input placeholder="Input" className="rounded-full"></Input>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </CardContent>
        </Card>
    </main>
}