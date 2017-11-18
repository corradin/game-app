import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';


import { AppComponent } from './app.component';
import { GameCharacterComponent } from './game-character/game-character.component';

import { GameCharacterService } from './game-character/game-character.service'


@NgModule({
  declarations: [
    AppComponent,
    GameCharacterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GameCharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
