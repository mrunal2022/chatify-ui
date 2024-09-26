import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plain-text',
  templateUrl: './plain-text.component.html',
  styleUrls: ['./plain-text.component.scss']
})
export class PlainTextComponent {
  @Input() plainText:string;
}
