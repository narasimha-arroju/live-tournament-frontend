import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GetCricketService} from '../../get-cricket.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy{

  uniqueId: string;

  cricketSummary: JSON;
  cricketScore: JSON;
  currentTeamScore: string;
  currentTeam: string;
  otherTeam: string;
  otherTeamScore: string;
  // summaryUrl = 'http://localhost:8080/cricket/summary/';
  // scoreUrl = 'http://localhost:8080/cricket/scores/';


  batsman1: string;
  batsman2: string;
  bowler: string;
  batsman1Score: string;
  batsman2Score: string;
  bowlerScore: string;
  battingDetails: JSON[];
  battingArray: JSON[];
  bowlingDetails: any;
  bowlingArray: any;

  constructor(private getCricketService: GetCricketService, private route: ActivatedRoute) {
    this.uniqueId = this.route.snapshot.paramMap.get('unique_id');
    this.getCricketService.stompClient.subscribe('/cricket/scores/' + this.uniqueId, (data) => {
      this.cricketScore = JSON.parse(data.body);
      console.log(this.cricketScore);
      const str = 'score';
      const temp = this.cricketScore[str].split('v');
      for (const s of temp){
        const temp1 = s.trim().split(' ');
        if (s.includes('*')){
          this.currentTeam = temp1[0];
          this.currentTeamScore = temp1[1];
        }
        else{
          this.otherTeam = temp1[0];
          this.otherTeamScore = temp1[1];
        }
      }
    }, {id: 'scores'});
    // this.cricketScore = this.getCricketService.getScore(this.uniqueId).subscribe();
  }

  ngOnInit(): void {
    // this.cricketSummary = this.getCricketService.getSummary(this.uniqueId).subscribe(data => {
    this.getCricketService.stompClient.subscribe('/cricket/summary/' + this.uniqueId, (data) => {
      const res = JSON.parse(data.body);
      this.cricketSummary = res.summary;
      this.battingDetails = res.summary.data.batting;
      this.battingArray = JSON.parse(JSON.stringify(this.battingDetails[this.battingDetails.length - 1])).scores;
      for (const obj of this.battingArray){
        const temp = JSON.parse(JSON.stringify(obj));
        if (temp.dismissal === undefined){
          if (this.batsman1 == null){
            this.batsman1 = temp.batsman;
            this.batsman1Score = temp.R + '/' + temp.B;
          }
          else{
            this.batsman2 = temp.batsman;
            this.batsman2Score = temp.R + '/' + temp.B;
          }
        }
      }
      this.bowlingDetails = res.summary.data.bowling;
      this.bowlingArray = JSON.parse(JSON.stringify(this.bowlingDetails[this.bowlingDetails.length - 1])).scores;
      for (const obj of this.bowlingArray){
        if (Number(obj.O) % 1 > 0){
          this.bowler = obj.bowler;
          this.bowlerScore = obj.W + '/' + obj.R;
        }
      }
    }, {id: 'summary'});
  }
  ngOnDestroy(): void {
    this.getCricketService.stompClient.unsubscribe('scores');
    this.getCricketService.stompClient.unsubscribe('summary');
  }
}
