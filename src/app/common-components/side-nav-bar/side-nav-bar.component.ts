import { Component, EventEmitter, Output } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {
  constructor(public chatBotService: ChatbotService) { }

  toogleSidebar() {
    this.chatBotService.isSideNavVisible = !this.chatBotService.isSideNavVisible;
  }
}
