import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConversationHistory, IPrompt } from '../constants/chatbot.model';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  isSideNavVisible: boolean = true;
  isResProcessing: boolean;
  showLoader = false;
  conversationHistory: BehaviorSubject<IConversationHistory[]> =new BehaviorSubject<IConversationHistory[]>([]);

  constructor(private httpClient: HttpClient) { }

  getResponseFromGemini(prompt: IPrompt) {
    return this.httpClient.post<any>(
      `${environment.apiBasePath}/text-generate-from-multimodal`,
      prompt
    );
  }

  getChatHistoryList() {
    return this.httpClient.get<any>(
      `${environment.apiBasePath}/getChatHistoryList`
    );
  }

  getChatById(chatId) {
    const url = environment.apiBasePath + "/getChatByChatId?chatId=" + encodeURIComponent(chatId);
    return this.httpClient.get(url);
  }
}
