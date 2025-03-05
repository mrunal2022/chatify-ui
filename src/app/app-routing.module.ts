import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { LoginComponent } from './common-components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "chat-session",
    component: ChatWindowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "chat-session/:id",
    component: ChatWindowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: "login",
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Enable hash-based routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
