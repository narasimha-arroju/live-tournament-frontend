import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchPayload } from './match-payload';
import {Router} from '@angular/router';
import {GetCricketService} from '../get-cricket.service';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css']
})
export class CricketComponent implements OnInit, OnDestroy {

  matches: Array<MatchPayload>;
  public isCollapsed = false;

  constructor(private getCricketService: GetCricketService, private router: Router) {
  }

  ngOnInit(): void {
    // this.getCricketService.getMatches().subscribe(matches => {
    //   this.matches = matches;
    // });
    this.getCricketService.stompClient.subscribe('/cricket/matches', (matches) => {
      this.matches = JSON.parse(matches.body);
    }, { id: 'matches'});
  }

  selectMatch(selectedMatch: MatchPayload): void{
    this.router.navigate(['./live', selectedMatch.unique_id]);
    console.log(selectedMatch);
  }

  ngOnDestroy(): void {
    this.getCricketService.stompClient.unsubscribe('matches');
    // this.getCricketService.unSubscribe('matches');
  }
}
