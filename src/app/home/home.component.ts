import { Component, OnInit } from '@angular/core';
import {GetCricketService} from '../get-cricket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  getCricketService: GetCricketService;

  constructor(getCricketService: GetCricketService){
    this.getCricketService = getCricketService;
  }

  ngOnInit(): void {
  }

}
