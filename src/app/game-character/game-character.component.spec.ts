import { TestBed, async } from '@angular/core/testing';
import { GameCharacterComponent } from './game-character.component';
import { GameCharacterService } from './game-character.service'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw'
import { GameCharacter } from './game-character';

let gameCharacterServiceStub;
//An array of GameCharacter objects
const makeGameCharacters = () => [
  {
    "id": 9460,
    "name": "Janus",
    "created_at": 1472328002062,
    "updated_at": 1472328002125,
    "slug": "janus",
    "url": "https://www.igdb.com/characters/janus",
    "people": [
      80788
    ],
    "games": [
      9498
    ]
  }
] as GameCharacter[];

describe('GameCharacterComponent', () => {
  beforeEach(async(() => {
    gameCharacterServiceStub = {
      getGameCharacters(): Observable<GameCharacter[]> {
        return of(makeGameCharacters());
      }
    };
    TestBed.configureTestingModule({
      declarations: [
        GameCharacterComponent
      ],
      providers: [{ provide: GameCharacterService, useValue: gameCharacterServiceStub }]
    }).compileComponents();
  }));

  it('should create the game character component', async(() => {
    const fixture = TestBed.createComponent(GameCharacterComponent);
    // GameCharacterService actually injected into the component with the stub as specified above
    let gameCharacterService = fixture.debugElement.injector.get(GameCharacterService);

    const gameCharacterComponent = fixture.debugElement.componentInstance;
    expect(gameCharacterComponent).toBeTruthy();
  }));

  /* UTs: Component properties */
  it(`should have as title 'Game Characters App'`, async(() => {
    const fixture = TestBed.createComponent(GameCharacterComponent);
    const gameCharacterComponent = fixture.debugElement.componentInstance;
    expect(gameCharacterComponent.title).toEqual('Game Characters App');
  }));

  it('should contain character data', async(() => {
    const fixture = TestBed.createComponent(GameCharacterComponent);
    const gameCharacterComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    expect(gameCharacterComponent.gameCharacters).toBeDefined();
  }));

  it('should return an error, when the service fails to return data', function () {
    // UserService from the root injector
    let gameCharacterServiceStub = TestBed.get(GameCharacterService);

    //Return an error
    gameCharacterServiceStub.getGameCharacters = function (): Observable<GameCharacter> {
      return Observable.throw(new Error('Whoops, cannot retrieve character data'));
    }

    const fixture = TestBed.createComponent(GameCharacterComponent);
    const gameCharacterComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(gameCharacterComponent.error).toBeTruthy();
  });

  /* UTs: HTML Rendering */
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(GameCharacterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Game Characters');
  }));

  it('should render game character data', function () {
    const fixture = TestBed.createComponent(GameCharacterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Janus');
  });
});