import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

const routes: Routes = [
  {
    path: "chat-session",
    component: ChatWindowComponent,
  
  },
  {
    path: "chat-session/:id",
    component: ChatWindowComponent,
  
  },
  {
    path: '**',
    redirectTo: "chat-session",
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
