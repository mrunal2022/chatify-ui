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
      icon: ""
    },
    {
      text: "Act like Mowgli from The Jungle Book and answer questions",
      icon: ""
    },
    {
      text: "Create a list of power phrases for my resume",
      icon: ""
    },
    {
      text: "Suggest a aesthetic places for my summer vacation",
      icon: ""
    }
  ];

}
