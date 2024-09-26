export class IPrompt {
    prompt: string;
    imgPrompt?: string;
}

export interface IConversationHistory{
    role:string;
    parts:Iparts[];
}

export interface Iparts{
    text:string;
}

