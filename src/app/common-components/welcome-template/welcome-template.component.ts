import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'welcome-template',
  templateUrl: './welcome-template.component.html',
  styleUrls: ['./welcome-template.component.scss']
})
export class WelcomeTemplateComponent {
  firstName: string = '';

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

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.firstName = decodedToken["name"].split(' ')[0];
    }
  }
}
