import { Component, ElementRef, ViewChild } from '@angular/core';
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
  inputPrompt: IPrompt = {
    prompt: '',
    imgPrompt: ''
  };
  textPrompt: string;
  inputPromptLength: number = 0;
  showShimmer = false;
  hasChatRefreshed: boolean;

  @ViewChild('msgArea') msgArea: ElementRef<HTMLDivElement>;
  @ViewChild('textarea') textarea;

  initialTextareaHeight = 0;
  initialMsgAreaHeight = 0;

  ngOnInit() {
    const chatHistory = JSON.parse(sessionStorage.getItem("chatify-chatHistory"));
    if (chatHistory?.length > 0) {
      this.chatBotService.showLoader = true;
      this.conversationHistory = chatHistory;
      this.hasChatRefreshed = true;
    }
  }

  ngAfterViewInit() {
    this.initialTextareaHeight = this.textarea?.nativeElement.clientHeight;
    this.initialMsgAreaHeight = this.msgArea?.nativeElement.clientHeight;
  }

  getInputPrompt(event: Event) {
    this.inputPrompt.prompt = (event.target as any).innerText;
    this.inputPromptLength = this.inputPrompt.prompt?.length;
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

  //paste only plain text
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    document.execCommand('insertText', false, event.clipboardData?.getData('text'));
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
    this.textarea.nativeElement.innerHTML = '';
    this.textarea.nativeElement.style.height = 'auto';
    this.msgArea.nativeElement.style.height = this.initialMsgAreaHeight + 'px'; // Restore the original height 
    this.inputPromptLength = 0;
  }

  sendPromptToChatbot() {
    if (this.inputPromptLength > 0 && this.inputPrompt.prompt.trim().length != 0) {
      this.chatBotService.isResProcessing = true;
      this.clearTextArea();
      let partsTemp: Iparts[] = [];
      partsTemp.push({ text: this.inputPrompt.prompt });
      partsTemp.push({ text: this.inputPrompt.imgPrompt });
      this.conversationHistory.push({
        role: "user",
        parts: partsTemp
      });
      sessionStorage.setItem("chatify-chatHistory", JSON.stringify(this.conversationHistory));
      this.scrollToHumanMsg(this.conversationHistory.length - 1);
      this.callGeminiApi();
    }
  }

  uploadImg(event) {
    const file = event.target.files[0];
    console.log(event)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.inputPrompt.imgPrompt = e.target.result;

        //push img into textarea div
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '40px';
        const editableTextBox = document.querySelector('.textarea');
        editableTextBox?.appendChild(img);
      };
      reader.readAsDataURL(file);
    }

  }

  callGeminiApi() {
    this.showShimmer = true;
    let formattedInputprompt={
      prompt:this.inputPrompt.prompt,
      imgPrompt:this.inputPrompt.imgPrompt?.split(',')[1]
    }
    this.chatBotService.getResponseFromGemini(formattedInputprompt).subscribe((res) => {
      this.inputPrompt.prompt = '';
      this.inputPrompt.imgPrompt = null;
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
