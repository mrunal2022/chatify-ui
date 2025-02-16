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

//---------------------------------------------------------
// ngOnInit() {
//   this.formatText(this.msg[0].text);
// }

// async formatText(text: string) {
//   // let codeText: any = text.replace(/```(.*?)```/gs, (match, code) => {
//   //   const sanitizedCode: any = this.sanitizer.bypassSecurityTrustHtml(code);
//   //   return `<code-block [code]="${sanitizedCode.changingThisBreaksApplicationSecurity}"></code-block>`; // modified code block rendering
//   // });

//   // console.log(codeText);
//   this.chatBotService.isResProcessing = true;

//   const text1 = text.split('\n');

//   let formattedLines: any = text1.map(line => {
//     line = line.replace(/^\* /, '• ');
//     line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

//     return line;
//   });

//   const finalText = formattedLines.join('\n');
//   let segregatedCode=this.segregateContent(finalText);
//   console.log("segregated code", segregatedCode);

//   for (const item of segregatedCode) {
//     if (item.type === 'text') {
//        this.typeText(item.content);
//     } else if (item.type === 'code') {
//        this.typeCodeBlock(item.content);
//     }
//   }
// }

// typeCodeBlock(code: string): Promise<void> {
//   return new Promise((resolve) => {
//     const componentRef = this.codeBlock.createComponent(CodeBlockComponent);
//     (componentRef.instance as any).code = code; // Pass code to your code block component

//     // Wait for a short duration to simulate typing effect
//     setTimeout(() => {
//       resolve();
//     }, this.typingSpeed * code.length); // Adjust timeout duration based on code length
//   });
// }

// typeText(text: string): Promise<void> {
//   return new Promise((resolve) => {
//     let charIndex = 0;

//     const interval = setInterval(() => {
//       if (charIndex < text.length) {
//         this.formattedMessage += text[charIndex];
//         charIndex++;
//       } else {
//         clearInterval(interval);
//         resolve(); // Resolve when typing is complete
//       }
//     }, this.typingSpeed);
//   });
// }

// segregateContent(content) {
//   // Regular expression to match code blocks
//   const codeBlockPattern =/```(.*?)```/gs;
//   const sections:any = [];
//   let lastIndex = 0;
//   let match;

//   // Iterate over all matches for code blocks
//   while ((match = codeBlockPattern.exec(content)) !== null) {
//     // Push text before the current code block
//     if (match.index > lastIndex) {
//       sections.push({ type: 'text', content: content.substring(lastIndex, match.index).trim() });
//     }
//     // Push the code block
//     sections.push({ type: 'code', content: match[1]});
//     // Update last index to the end of the current match
//     lastIndex = match.index + match[0].length;
//   }
//   // Push any remaining text after the last code block
//   if (lastIndex < content.length) {
//     sections.push({ type: 'text', content: content.substring(lastIndex).trim() });
//   }

//   return sections;
// }

// <!-- [ngClass]="this.conversationHistory?.length===0 ? 'disable-cls' : null" -->