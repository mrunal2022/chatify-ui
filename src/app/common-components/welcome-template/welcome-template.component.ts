import { Component } from '@angular/core';

@Component({
  selector: 'welcome-template',
  templateUrl: './welcome-template.component.html',
  styleUrls: ['./welcome-template.component.scss']
})
export class WelcomeTemplateComponent {

  public taskCards = [
    {
      text: "Explain the following code step-by-step in detail",
      icon: "assets/code.png"
    },
    {
      text: "Act like Mowgli from The Jungle Book and answer questions",
      icon: "assets/brainStorming.png"
    },
    {
      text: "Create a list of power phrases for my resume",
      icon: "assets/clipboard.png"
    },
    {
      text: "Suggest a aesthetic places for my summer vacation",
      icon: "assets/idea.png"
    }
  ];

}
