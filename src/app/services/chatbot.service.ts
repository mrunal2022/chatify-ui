import { Injectable } from '@angular/core';
import { IPrompt } from '../constants/chatbot.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  isSideNavVisible: boolean = true;
  isResProcessing:boolean;

  constructor(private httpClient: HttpClient) { }

  getResponseFromGemini(prompt: IPrompt) {
    return this.httpClient.post<any>(
      `${environment.apiBasePath}/text-generate-from-multimodal`,
      prompt
    );
  }
}
