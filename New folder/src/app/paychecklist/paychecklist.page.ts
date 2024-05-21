import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-paychecklist',
  templateUrl: './paychecklist.page.html',
  styleUrls: ['./paychecklist.page.scss'],
})
export class PaychecklistPage implements OnInit {
  clickbtn:any = "true";
  emploies:any=[];
  items:any=[];
  stubTransactionalhistory:any;
  empstatus:any = "No Status";
  stubmonth:any;
  constructor(public userservice: UserService,private router:Router, public navCtrl: NavController) {
    this.allpaychque();
  }

  ngOnInit() {
    this.getallmonths()

  }

  clickbtnchange(da){

    this.clickbtn = da;
    console.log(da);
    if(da == 'false'){
      this.allpaychque();
    }
  }

  allpaychque(){
     this.userservice.allpaychque().subscribe((data: any) => {
          this.emploies = data.response; 
          this.items = data.response;
          console.log(this.emploies);
      }, (err :any) => {
         console.log(err);
      });
  }

  initializeItems(){
         // this.items = ["Ram","gopi", "dravid"];
         this.items = this.emploies;
     }

     getItems(ev: any) {
         // Reset items back to all of the items
         this.initializeItems();

         // set val to the value of the searchbar
         const val = ev.target.value;

         // if the value is an empty string don't filter the items
         if (val && val.trim() !== '') {
             // this.isItemAvailable = true;
             this.items = this.items.filter((item) => {
                 return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
             })
         } else {
             // this.isItemAvailable = false;
         }
     }

    callempdetail(da){
        console.log(da);
        let navigationExtras: NavigationExtras = {
              queryParams: {
                  datasend: JSON.stringify(da),
              }
          };
          this.navCtrl.navigateForward(['employdetail'], navigationExtras);
    }

    getallmonths() {

      this.userservice.stubTransactionalhistory().subscribe((data: any) => {
        this.stubTransactionalhistory = data;
        console.log(this.stubTransactionalhistory);
      }, (err: any) => {
        console.log(err);
      });
    }
    
    viewTransactions(month: number) {
      console.log("EF",month)
      this.router.navigate(['/viewstubtransactions', month]);
    }

}
