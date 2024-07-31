import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeData } from '@/app/data/TestData'
import Image from 'next/image'
import { Eye, Heart, Bookmark, Search } from 'lucide-react'

export default function Home() {

  return (
    <main className="w-full h-full">
      <div className="w-fit h-fit rounded-xl bg-background-2 p-4 m-2">
        <h1 className="text-primary text-2xl font-[600]">There's lot you can cook</h1>
        <h2 className="mb-2 font-[600]">and a lot you can share</h2>
        <h2 className="text-foreground/50 mb-3">
          Find your next cooking adventure or write your own recipes
        </h2>
        <Button className="bg-primary w-6/12 mb-2 rounded-3xl">Create your own</Button>
        <div className="relative">
          <Search className="w-5 h-5 absolute top-[10px] left-3 text-foreground/50" />
          <Input placeholder="Search for recipes" className="bg-background-3 rounded-3xl pl-10" />
        </div>
      </div>
      <div className="w-fit m-2">
        <Button className="bg-primary h-8 rounded-3xl">All</Button>
        <Button className="bg-background-2 h-8 rounded-3xl mx-1 text-white">Most Popular</Button>
        <Button className="bg-background-2 h-8 rounded-3xl text-white">New</Button>
      </div>
      <div className="w-screen px-2">
        {RecipeData.map((recipe) => (
          <div key={recipe.id} className="flex flex-row w-full h-[120px] bg-background-2 my-2 rounded-2xl">
            <Image src={recipe.imageUrl} width={120} height={120} className="flex flex-shrink-0 rounded-bl-2xl rounded-tl-2xl" alt={recipe.imageUrl} />
            <div className="ml-2 w-full">
              <h1 className="text-base">{recipe.title}</h1>
              <h2 className="text-foreground/50 text-sm">{recipe.description}</h2>
              <h2 className="text-foreground/25 text-xs">by @{recipe.author}</h2>
              <div className="flex flex-row mt-8">
                <div className="felx flex-row relative rounded-3xl">
                  <Heart className="w-[18px] h-[18px] absolute top-1 text-foreground/50" />
                  <Button className="h-6 pl-6 bg-transparent text-foreground/50 hover:bg-transparent">{recipe.likes}</Button>
                </div>
                <div className="felx flex-row relative">
                  <Eye className="w-[18px] h-[18px] absolute top-1 text-foreground/50" />
                  <Button className="h-6 pl-6 bg-transparent text-foreground/50 hover:bg-transparent">{recipe.views}</Button>
                </div>
                <button className="hover:bg-transparent"><Bookmark className="w-[18px] h-[18px] text-foreground/50" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
