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
    correction: {
        nota1: number;
        nota2: number;
        nota3: number;
        nota4: number;
        nota5: number;
        feedback1: string;
        feedback2: string;
        feedback3: string;
        feedback4: string;
        feedback5: string;
    };
}
