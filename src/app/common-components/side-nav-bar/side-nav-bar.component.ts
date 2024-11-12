import { Component } from '@angular/core';
import { ChatHistoryList } from 'src/app/constants/chatbot.constants';
import { ChatbotService } from 'src/app/services/chatbot.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {
  constructor(public chatBotService: ChatbotService) { }
  chatHistoryList=ChatHistoryList;

  toogleSidebar() {
    this.chatBotService.isSideNavVisible = !this.chatBotService.isSideNavVisible;
  }

  newChat(){
    const myId = uuid.v4();
  }
}
