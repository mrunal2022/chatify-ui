import { Component, Input } from '@angular/core';
import { Iparts } from 'src/app/constants/chatbot.model';

@Component({
  selector: 'app-human-msg-box',
  templateUrl: './human-msg-box.component.html',
  styleUrls: ['./human-msg-box.component.scss']
})
export class HumanMsgBoxComponent {
  // sampleText="i want to block the person typing in text area to press key enter i html angular. give precise code and neat and in short ok . dont overdo. i want to block the person typing in text area to press key enter i html angular. give precise code and neat and in short ok . dont overdo.i want to block the person typing in text area to press key enter i html angular. give precise code and neat and in short ok . dont overdo.i want to block the person typing in text area to press key enter i html angular. give precise code and neat and in short ok . dont overdo.i want to block the person typing in text area to press key enter i html angular. give precise code and neat and in short ok . dont overdo.";
	@Input() msg ;
}
