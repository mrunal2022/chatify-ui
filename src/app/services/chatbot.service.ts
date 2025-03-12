import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatHistoryList, IConversationHistory, IPrompt } from '../constants/chatbot.model';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  isSideNavVisible: boolean = true;
  isResProcessing: boolean;
  showLoader = false;
  conversationHistory: BehaviorSubject<IConversationHistory[]> =new BehaviorSubject<IConversationHistory[]>(null);

  constructor(private httpClient: HttpClient) { }

  getResponseFromGemini(prompt: IPrompt) {
    return this.httpClient.post<any>(
      `${environment.apiBasePath}/text-generate-from-multimodal`,
      prompt
    );
  }

  getChatHistoryList(): Observable<ChatHistoryList[]> {
    return this.httpClient.get<any>(
      `${environment.apiBasePath}/getChatHistoryList`
    );
  }

  getChatById(chatId) {
    const url = environment.apiBasePath + "/getChatByChatId?chatId=" + encodeURIComponent(chatId);
    return this.httpClient.get(url);
  }
}
