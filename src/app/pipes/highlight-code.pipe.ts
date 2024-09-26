import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';

@Pipe({
  name: 'highlightCode'
})
export class HighlightCodePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(code)  {
    let highlightedCode:any;
    highlightedCode = hljs.highlightAuto(code).value;
    return this.sanitizer.bypassSecurityTrustHtml(highlightedCode);
  }

}
