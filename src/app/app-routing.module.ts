import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

const routes: Routes = [
  {
    path: "chat-window",
    component: ChatWindowComponent,
  
  },
  {
    path: '**',
    redirectTo: "chat-window",
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
