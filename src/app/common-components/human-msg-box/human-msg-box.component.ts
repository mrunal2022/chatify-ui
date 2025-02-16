import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-human-msg-box',
  templateUrl: './human-msg-box.component.html',
  styleUrls: ['./human-msg-box.component.scss']
})
export class HumanMsgBoxComponent {
  @Input() msg: any;
  @Input() humanBoxIndex: number;

  ngOnChanges() {
    const base64String = this.msg[1]?.text;

    if (base64String) {

      // Convert base64 string to Blob
      const file = this.base64ToBlob(base64String, 'image/png');

      if (file) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '140px';

          const editableTextBox = document.querySelector(`#humanResponse${this.humanBoxIndex}`);
          editableTextBox?.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // to convert base64 to Blob
  base64ToBlob(base64: string, contentType: string) {

    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }


}
