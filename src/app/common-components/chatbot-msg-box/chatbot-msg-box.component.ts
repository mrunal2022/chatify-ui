import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'chatbot-msg-box',
  templateUrl: './chatbot-msg-box.component.html',
  styleUrls: ['./chatbot-msg-box.component.scss']
})
export class ChatBotMsgBoxComponent {
  @Input() msg;
  formattedMessage: string = "";
  typingSpeed: number =1; // typing speed (ms per character)
  @ViewChild('messageContainer', { read: ViewContainerRef, static: true }) messageContainer: ViewContainerRef;

  constructor(private chatBotService: ChatbotService
) { }

ngOnInit() {
  this.formatText(this.msg[0].text);
}

formatText(text: string) {
  // make the text enclosed in ** BOLD, replace * with bullet point
  // text enclosed in ``` is of code format

  this.chatBotService.isResProcessing = true;
  const lines = text.split('\n');

    let formattedLines: any = lines.map(line => {
    line = line.replace(/^\* /, '• ');
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return line;
  });

  const finalText = formattedLines.join('\n');  
  this.typeText(finalText);
}

typeText(text: string) {
  let charIndex = 0;

  const interval = setInterval(() => {
    if (charIndex < text.length) {
      this.formattedMessage += text[charIndex];
      charIndex++;
    } else {
      clearInterval(interval);
      this.chatBotService.isResProcessing = false;
    }
  }, this.typingSpeed ); 
}

  // formatText(text: string) {
  //   this.chatBotService.isResProcessing = true;
  //   const lines = text.split('\n');
  
  //   let formattedLines: any = lines.map(line => {
  //     line = line.replace(/^\* /, '• '); // Bullet points
  //     line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold text
  //     return line;
  //   });
  
  //   // Replace code blocks with a placeholder to render as components
  //   formattedLines = formattedLines.join('\n').replace(/```([\s\S]*?)```/g, (_, code) => {
  //     const placeholder = '<code-block-placeholder></code-block-placeholder>';
  //     this.insertCodeBlock(code.trim()); // Insert the code block component
  //     return placeholder; // Return the placeholder to indicate where the component should go
  //   });
  
  //   this.typeText(formattedLines); // Pass the formatted lines to the typing function
  // }

  // insertCodeBlock(code: string) {
  //   // Dynamically create and insert the CodeBlockComponent into the DOM
  //   const codeBlockFactory = this.resolver.resolveComponentFactory(CodeBlockComponent);
  //   const codeBlockRef = this.messageContainer.createComponent(codeBlockFactory);
  //   codeBlockRef.instance.code = code; // Pass the extracted code to the component
  // }
  

  // typeText(text: string) {
  //   let charIndex = 0;
  //   const chunks = text.match(/<[^>]*>|[^<]+/g) || []; // Split into HTML tags and text chunks
  //   const interval = setInterval(() => {
  //     if (charIndex < chunks.length) {
  //       const currentChunk = chunks[charIndex];
  
  //       // Append the chunk directly to formattedMessage
  //       this.formattedMessage += currentChunk;
  
  //       // Update the view with innerHTML
  //       this.updateFormattedMessage();
  
  //       // Check for placeholder to remove
  //       if (currentChunk === '<code-block-placeholder></code-block-placeholder>') {
  //         // Remove the placeholder
  //         this.formattedMessage = this.formattedMessage.replace('<code-block-placeholder></code-block-placeholder>', '');
  //       }
  
  //       charIndex++;
  //     } else {
  //       clearInterval(interval);
  //       this.chatBotService.isResProcessing = false;
  //     }
  //   }, this.typingSpeed);
  // }
  
  // updateFormattedMessage() {
  //   // Update the innerHTML of the message container to render the HTML tags properly
  //   const messageContainerElement = document.querySelector('.robotResponse');
  //   if (messageContainerElement) {
  //     messageContainerElement.innerHTML = this.formattedMessage;
  //   }
  // }
  


}
