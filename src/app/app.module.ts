import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { HeaderComponent } from './common-components/header/header.component';
import { SideNavBarComponent } from './common-components/side-nav-bar/side-nav-bar.component';
import { ChatBotMsgBoxComponent } from './common-components/chatbot-msg-box/chatbot-msg-box.component';
import { HumanMsgBoxComponent } from './common-components/human-msg-box/human-msg-box.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ShimmerModule } from '@sreyaj/ng-shimmer';
import { CustomShimmerComponent } from './common-components/custom-shimmer/custom-shimmer.component';
import { CodeBlockComponent } from './common-components/code-block/code-block.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    ChatBotMsgBoxComponent,
    HeaderComponent,
    SideNavBarComponent,
    HumanMsgBoxComponent,
    CustomShimmerComponent,
    CodeBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ShimmerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
