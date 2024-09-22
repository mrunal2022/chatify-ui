import { Component, Input } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent {
  @Input() code: string = `ngOnChanges(){
    console.log(this.code,"code")
  }
  ngAfterViewInit() {
    this.formattedCode = hljs.highlightAuto(this.code).value;
  }`;


  isCodeCopied = false;
  detectedLanguage: string | undefined;

  ngOnInit() {
    let code = `ngOnChanges(){
    console.log(this.code,"code")
  }
  ngAfterViewInit() {
    this.formattedCode = hljs.highlightAuto(this.code).value;
  `;
    const result = hljs.highlightAuto(code);
    this.detectedLanguage = result.language;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.code).catch(err => console.error('Could not copy: ', err));
    this.isCodeCopied = true;

    setTimeout(() => { //show "copied" msg for 5 sec
      this.isCodeCopied = false;
    }, 5000);
  }
}
