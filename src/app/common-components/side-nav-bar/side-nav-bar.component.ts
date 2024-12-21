import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChatHistoryList, IConversationHistory } from 'src/app/constants/chatbot.model';
import { ChatbotService } from 'src/app/services/chatbot.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {
  constructor(public chatBotService: ChatbotService, public router: Router) { }
  @Input() chatHistoryList: ChatHistoryList[];
  @Input() conversationHistory:IConversationHistory[];



  toogleSidebar() {
    this.chatBotService.isSideNavVisible = !this.chatBotService.isSideNavVisible;
  }

  newChat() {
    this.conversationHistory=[];
    const generatedUuid = uuid.v4();
    this.router.navigate(['/chat-session', generatedUuid]);
  }

  clickChatItem(chatItem) {
    this.router.navigate(['/chat-session', chatItem.chatId]);
  }

 
}
