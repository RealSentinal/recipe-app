interface Recipe {
    title: string;
    views: number;
    likes: number;
    imageUrl: string;
    id: number;
    author: string;
    date: string;
    description: string;
}

export const RecipeData: Recipe[] = [
    {
        title: "Recipe 1",
        views: 0,
        likes: 0,
        imageUrl: "/img_1.jpg",
        id: 1,
        author: "User 1",
        date: "2022-01-01",
        description: "This is a description",
    },
    {
        title: "Recipe 2",
        views: 0,
        likes: 0,
        imageUrl: "/img_2.jpg",
        id: 2,
        author: "User 2",
        date: "2022-01-01",
        description: "This is a description",
    },
]