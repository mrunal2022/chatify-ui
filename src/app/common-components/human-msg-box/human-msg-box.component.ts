import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-human-msg-box',
  templateUrl: './human-msg-box.component.html',
  styleUrls: ['./human-msg-box.component.scss']
})
export class HumanMsgBoxComponent {
	@Input() msg ;
}
