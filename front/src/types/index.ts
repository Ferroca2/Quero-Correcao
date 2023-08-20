export interface Theme {
    id: string;
    name: string;
    numberOfStudent: number;
    avarageNote: number;
    text: string;
    typeOfEssay: string;
}

export interface Essay {
    id: string;
    theme: string;
    imageUrl: string;
    status: string;
    createdAt: string;
    content: string;
    sum: number;
}
