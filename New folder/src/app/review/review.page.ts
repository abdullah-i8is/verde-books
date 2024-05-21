import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Location } from "@angular/common";
import { UserService } from '../api/user.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  datasend:any;
  mydate:any;
  week:any;
  totalpay:any=0;
  totalnetpay:any = 0;
  total_employcount:any = 0;
  employiestax:any =0;
  arraylist:any = [];
  constructor(private route: ActivatedRoute,public navCtrl: NavController,private location: Location,public userservice: UserService) {
    this.onrun();
  }

  ngOnInit() {
  }

  getallemployes(){
     this.userservice.allemp().subscribe((data: any) => {
          console.log(data);
      }, (err :any) => {
         console.log(err);
      });
  }

  myBackButton(){
    // --> api /api/editStub
    // this.arraylist.push({});
    // this.location.back();
    for(let i = 0;i<this.datasend.length;i++){
      this.arraylist.push([this.datasend[i].id,this.datasend[i].status]);
    }
    console.log(this.arraylist);
    this.sendbackdata();
  }

  sendbackdata(){
    this.userservice.backdata(this.arraylist).subscribe((data: any) => {
          console.log(data);
          this.arraylist = [];
          this.location.back();
      }, (err :any) => {
         console.log(err);
      });
  }

  onrun(){
    this.route.queryParams.subscribe(params => {
        this.datasend = JSON.parse(params["datasend"]);
        this.mydate = JSON.parse(params["mydate"]);
        this.week = JSON.parse(params["week"]);
        this.totalpay = 0;
        this.datasend = this.datasend.response;
        console.log(this.datasend);

        this.total_employcount = this.datasend.length;
        for(let i=0;i<this.datasend.length;i++){
          console.log(this.datasend[i].TotalPayCurrent);
          this.totalpay = this.totalpay + parseInt(this.datasend[i].TotalPayCurrent);
          this.totalnetpay = this.totalnetpay + parseInt(this.datasend[i].NetPay);

          this.employiestax = this.employiestax + parseInt(this.datasend[i].TotalTaxCurrent);
        }

    });
  }

  nextpage(){
    console.log("/////////////////////////////////////////");
    console.log(this.datasend);
    // console.log();
    // var value = [];
    // for(let i=0; i< this.datasend.length){
    //   value.push(this.datasend[i]);
    // }
    let navigationExtras: NavigationExtras = {
              queryParams: {
                  values: JSON.stringify(this.datasend),
                  today: JSON.stringify(this.mydate),
                  // refresh: refresh
              }
    };
    this.navCtrl.navigateForward(['done'], navigationExtras);
  }

}
