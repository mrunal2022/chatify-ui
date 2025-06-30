export class IPrompt {
    prompt: string;
    imgPrompt?: string;
    chatId?: string;
    userId?: string;
}

export interface IConversationHistory{
    role:string;
    parts:Iparts[];
}

export interface Iparts{
    text:string;
}

export interface ChatHistoryList  {
    userId: string;
    title: string;
    messages: {
      role: 'user' | 'model';
      parts: { text: string }[];
    }[];
    createdAt: Date;
    updatedAt: Date;
  }

