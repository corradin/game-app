import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { GameCharacter } from './game-character';

const httpOptions = {
    headers: new HttpHeaders({ 
      'Accept': 'application/json',
      'X-Mashape-Key': `[it's a secret]`
    })
  };

@Injectable()
export class GameCharacterService {
    private gameCharacterUrl = 'https://igdbcom-internet-game-database-v1.p.mashape.com/characters/?fields=*&limit=1';
    constructor(private httpClient: HttpClient) { }

    getGameCharacters(): Observable<GameCharacter[]> {
        return this.httpClient.get<GameCharacter[]>(this.gameCharacterUrl, httpOptions)
        .pipe(
          catchError(this.handleError('getGameCharacters', [])),
          tap(gameCharacterData => console.log(gameCharacterData))
        );
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a GameCharacterService message with the MessageService */
  private log(message: string) {
    console.log('GameCharacterService: ' + message);
  }
}