import {
    async, inject, TestBed
} from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { GameCharacter } from './game-character';
import { GameCharacterService } from './game-character.service'

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

////////  Tests  /////////////
describe('Http-GameCharacterService (mockBackend)', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                GameCharacterService
            ]
        })
            .compileComponents();
    }));

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('can instantiate service when inject service',
        inject([GameCharacterService], (service: GameCharacterService) => {
            expect(service instanceof GameCharacterService).toBe(true);
        }));


    it('can instantiate service with "new"', inject([HttpClient], (httpClient: HttpClient) => {
        expect(httpClient).not.toBeNull('http should be provided');
        let service = new GameCharacterService(httpClient);
        expect(service instanceof GameCharacterService).toBe(true, 'new service should be ok');
    }));

    describe('when getGameCharacters', () => {
        let service: GameCharacterService;
        let fakeGameCharacters: GameCharacter[];

        beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
            service = new GameCharacterService(httpClient);
            fakeGameCharacters = makeGameCharacters();
        }));

        it('should return correct data from IGDB.com after an authenticated request has been made', async(inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            service
                .getGameCharacters()
                .subscribe(gameCharacters => expect(gameCharacters.length).toBe(fakeGameCharacters.length, 'should have expected no. of gameCharacters'));

            const req = httpMock.expectOne('https://igdbcom-internet-game-database-v1.p.mashape.com/characters/?fields=*&limit=1');
            expect(req.request.method).toEqual('GET');

            //return character data
            req.flush(fakeGameCharacters);

            // Finally, assert that there are no outstanding requests.
            httpMock.verify();
        })));

        it('should be OK returning no gameCharacters', async(inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            service
                .getGameCharacters()
                .subscribe(gameCharacters => expect(gameCharacters.length).toBe(0, 'should have no gameCharacters'));

            const req = httpMock.expectOne('https://igdbcom-internet-game-database-v1.p.mashape.com/characters/?fields=*&limit=1');
            expect(req.request.method).toEqual('GET');

            //return empty character data
            req.flush([]);

            // Finally, assert that there are no outstanding requests.
            httpMock.verify();
        })));

        it('should return an error after an erroneous request has been made', async(inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            service
                .getGameCharacters()
                .subscribe(gameCharacters => expect(gameCharacters.length).toBe(0, 'An error occurred, the error handler returns an empty data array and logs the error to the console'));

            const req = httpMock.expectOne('https://igdbcom-internet-game-database-v1.p.mashape.com/characters/?fields=*&limit=1');
            expect(req.request.method).toEqual('GET');

            //return empty character data
            req.error(new ErrorEvent('Erroneous request'));

            // Finally, assert that there are no outstanding requests.
            httpMock.verify();
        })));
    });
});