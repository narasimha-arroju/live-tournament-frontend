import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Observable} from 'rxjs';
import {MatchPayload} from './cricket/match-payload';

@Injectable({
  providedIn: 'root'
})
export class GetCricketService {
  ws: any;
  stompClient: any;

  constructor(){
    this.ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(this.ws);
    this.stompClient.connect({});
  }

  // getMatches(): Observable<Array<MatchPayload>>{
  //   return this.stompClient.subscribe('/cricket/matches', (matches) => {
  //      return  JSON.parse(matches.body);
  //   }, { id: 'matches'});
  // }

  // getScore(matchId: string): Observable<any>{
  //   return this.stompClient.subscribe('/cricket/scores' + matchId, live => {
  //     return JSON.parse(live.body);
  //   });
  // }
  //
  // getSummary(matchId: string): any{
  //   return this.stompClient.subscribe('/cricket/summary' + matchId, summary => {
  //     return summary.body;
  //   });
  // }
  //
  // unSubscribe(ID: string): void{
  //   this.stompClient.unsubscribe(ID);
  // }
}
