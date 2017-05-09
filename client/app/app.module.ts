import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';


import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {JumbotronComponent} from './components/jumbotron/jumbotron.component';
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [AppComponent, NavbarComponent, JumbotronComponent, FooterComponent],
  bootstrap: [AppComponent]
})

export class AppModule { } 
