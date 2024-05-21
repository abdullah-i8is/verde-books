import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
@Component({
  selector: 'app-payshed',
  templateUrl: './payshed.page.html',
  styleUrls: ['./payshed.page.scss'],
})
export class PayshedPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  myBackButton(){
	  this.location.back();
	}

}
