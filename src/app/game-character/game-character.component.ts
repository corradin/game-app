import { Component, OnInit } from '@angular/core';
import { GameCharacterService } from './game-character.service'
import { GameCharacter } from './game-character'

@Component({
  selector: 'game-character',
  templateUrl: './game-character.component.html',
  styleUrls: ['./game-character.component.css']
})
export class GameCharacterComponent implements OnInit {
  gameCharacters: GameCharacter[];
  title = 'Game Characters App';
  error = null;

  constructor(private gameCharacterService: GameCharacterService) { }

  ngOnInit() {
    this.getGameCharacterData();
  }

  getGameCharacterData(): void {
    this.gameCharacterService.getGameCharacters()
      .subscribe(
      gameCharacters => this.gameCharacters = gameCharacters,
      err => this.error = err
      );
  }
}