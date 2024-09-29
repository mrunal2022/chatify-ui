import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { PlainTextComponent } from '../plain-text/plain-text.component';

@Component({
  selector: 'chatbot-msg-box',
  templateUrl: './chatbot-msg-box.component.html',
  styleUrls: ['./chatbot-msg-box.component.scss']
})
export class ChatBotMsgBoxComponent {
  @Input() msg;
  @Input() hasChatRefreshed:boolean;
  formattedMessage: string = "";
  typingSpeed: number = 1; // typing speed (ms per character)
  @ViewChild('codeBlock', { read: ViewContainerRef, static: true }) codeBlock: ViewContainerRef;

  constructor(private chatBotService: ChatbotService) { }

  ngOnInit() {
    this.formatText(this.msg[0].text);
  }

  async formatText(text: string) {
    this.chatBotService.isResProcessing = true;

    const lines = text.split('\n');
    let formattedLines: any = lines.map(line => {
      line = line.replace(/^\* /, '• ');
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return line;
    });

    const finalText = formattedLines.join('\n');
    const segregatedCode = this.segregateContent(finalText);

    for (const item of segregatedCode) {
      if (item.type === 'text') {
        await this.typeText(item.content);
      } else if (item.type === 'code') {
        await this.typeCodeBlock(item.content, item.language);
      }
    }

    this.chatBotService.isResProcessing = false;
    this.chatBotService.showLoader = false;
  }

  typeCodeBlock(code: string, language: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const componentRef = this.codeBlock.createComponent(CodeBlockComponent);
      const componentInstance = componentRef.instance as any;

      componentInstance.code = '';
      componentInstance.language = language;

      if (this.hasChatRefreshed) {
        componentInstance.code = code;
        resolve();
      } else {
        let charIndex = 0;
        const interval = setInterval(() => {
          if (charIndex < code.length) {
            componentInstance.code += code[charIndex];
            charIndex++;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, this.typingSpeed);
      }
    });
  }


  typeText(text: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const componentRef = this.codeBlock.createComponent(PlainTextComponent);
      const componentInstance = componentRef.instance as any;

      componentInstance.plainText = '';

      if (this.hasChatRefreshed) {
        componentInstance.plainText = text;
        resolve();
      } else {
        let charIndex = 0;

        const interval = setInterval(() => {
          if (charIndex < text.length) {
            componentInstance.plainText += text[charIndex];
            charIndex++;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, this.typingSpeed);
      }
    });
  }

  segregateContent(content: string) {
    //TODO: refactor this func
    const codeBlockPattern = /```(\w+)?\s([\s\S]*?)```/g;
    const sections: any = [];
    let lastIndex = 0;
    let match: any;

    // Iterate over all matches for code blocks
    while ((match = codeBlockPattern.exec(content)) !== null) {
      // Push text before the current code block
      if (match.index > lastIndex) {
        sections.push({ type: 'text', content: content.substring(lastIndex, match.index).trimEnd() });
      }

      // Push the code block
      const language = match[1] ? match[1] : null; // Capture language if it exists
      const code = match[2]; // Code content
      sections.push({ type: 'code', content: code, language: language });

      // Update last index to the end of the current match
      lastIndex = match.index + match[0].length;
    }

    // Push any remaining text after the last code block
    if (lastIndex < content.length) {
      sections.push({ type: 'text', content: content.substring(lastIndex).trimEnd() });
    }

    return sections;
  }
}

