import { Component, Input } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent {
  @Input() code: any;
  @Input() language: string ="";

  isCodeCopied = false;

  copyToClipboard() {
    navigator.clipboard.writeText(this.code).catch(err => console.error('Could not copy: ', err));
    this.isCodeCopied = true;

    setTimeout(() => {
      this.isCodeCopied = false;
    }, 5000);
  }
}
