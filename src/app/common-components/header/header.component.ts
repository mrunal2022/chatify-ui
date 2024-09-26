import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public chatBotService: ChatbotService) { }

  toogleSidebar() {
    this.chatBotService.isSideNavVisible = !this.chatBotService.isSideNavVisible;
  }
}
