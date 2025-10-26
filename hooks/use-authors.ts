interface Author {
    name: string;
    role: string;
    imageUrl: string;
}

//Before entering more authors, fix component to allow more authors

export const useAuthors = () => {
    const authors: Author[] =
        [
            {
                name: "Wiktor Małyska",
                role: "Lead Developer",
                imageUrl: "https://avatars.githubusercontent.com/u/108685269?v=4"
            }
        ]
    return authors;
}