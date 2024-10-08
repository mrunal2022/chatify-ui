import { Component, ElementRef, ViewChild } from '@angular/core';
import { base64Str } from 'src/app/constants/base64str.constants';
import { IConversationHistory, Iparts, IPrompt } from 'src/app/constants/chatbot.model';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  constructor(public chatBotService: ChatbotService,) { }

  conversationHistory: IConversationHistory[] = [];
  inputPrompt: string;
  inputPromptLength: number = 0;
  showShimmer = false;
  hasChatRefreshed:boolean;

  @ViewChild('msgArea') msgArea: ElementRef<HTMLDivElement>;
  @ViewChild('textarea') textarea: ElementRef<HTMLTextAreaElement>;

  initialTextareaHeight = 0;
  initialMsgAreaHeight = 0;

  ngOnInit() {
    const chatHistory = JSON.parse(sessionStorage.getItem("chatify-chatHistory"));
    if (chatHistory?.length > 0) {
      this.chatBotService.showLoader=true;
      this.conversationHistory = chatHistory;
      this.hasChatRefreshed=true;
    }
  }

  ngAfterViewInit() {
    this.initialTextareaHeight = this.textarea?.nativeElement.clientHeight;
    this.initialMsgAreaHeight = this.msgArea?.nativeElement.clientHeight;
  }

  getInputPrompt(event: Event) {
    this.inputPrompt = (event.target as HTMLInputElement).value;
    this.inputPromptLength = this.inputPrompt.length;
  }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    // Adjust textarea height dynamically
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = newHeight + 'px';

    // Adjust msg-area-component height only if initial heights are set
    if (this.initialTextareaHeight && this.initialMsgAreaHeight) {
      const heightDifference = newHeight - this.initialTextareaHeight;
      const newMsgAreaHeight = this.initialMsgAreaHeight - heightDifference;

      if (newMsgAreaHeight > 0) {
        this.msgArea.nativeElement.style.height = newMsgAreaHeight + 'px';
      }
    }
  }

  onEnterKey(event) {
    if (this.chatBotService.isResProcessing) {
      event.preventDefault();  // Prevent Enter key if the API call is still in progress
    }
    else if (!this.chatBotService.isResProcessing) {
      event.preventDefault();  // Prevent adding a new line with Enter key
      this.sendPromptToChatbot();
    }
  }

  scrollToHumanMsg(index: number) {
    setTimeout(() => {
      const humanMsgBox = document.getElementById(`humanMsgBox${index}`);

      if (humanMsgBox) {
        humanMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  }

  scrollRobotMsg(index: number) {
    setTimeout(() => {
      const robotMsgBox = document.getElementById(`robotMsgBox${index}`);
      if (robotMsgBox) {
        robotMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  }

  scrollToMsg(index, msgType) {
    setTimeout(() => {
      let msgBox = document.getElementById(`${msgType[index]}`);
      msgBox?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  }

  clearTextArea() {
    this.textarea.nativeElement.value = '';
    this.textarea.nativeElement.style.height = 'auto';
    this.msgArea.nativeElement.style.height = this.initialMsgAreaHeight + 'px'; // Restore the original height 
    this.inputPromptLength = 0;
  }

  sendPromptToChatbot() {
    if (this.inputPromptLength > 0 && this.inputPrompt.trim().length != 0) {
      this.chatBotService.isResProcessing = true;
      this.clearTextArea();
      let partsTemp: Iparts[] = [];
      partsTemp.push({ text: this.inputPrompt });
      partsTemp.push({ text: base64Str });
      this.conversationHistory.push({
        role: "user",
        parts: partsTemp
      });
      sessionStorage.setItem("chatify-chatHistory", JSON.stringify(this.conversationHistory));
      this.scrollToHumanMsg(this.conversationHistory.length - 1);
      this.callGeminiApi();
    }
  }

  callGeminiApi() {
    let prompt: IPrompt = {
      prompt: this.inputPrompt
    }
    this.inputPrompt = '';
    this.showShimmer = true;
    this.chatBotService.getResponseFromGemini(prompt).subscribe((res) => {
      let partsTemp: Iparts[] = [];
      partsTemp.push({ text: res.text });
      this.conversationHistory.push({
        role: "model",
        parts: partsTemp
      });
      sessionStorage.setItem("chatify-chatHistory", JSON.stringify(this.conversationHistory));
      this.scrollRobotMsg(this.conversationHistory.length - 1);
      this.showShimmer = false;
    });
  }
}
