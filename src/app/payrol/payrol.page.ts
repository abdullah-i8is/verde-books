import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-payrol',
  templateUrl: './payrol.page.html',
  styleUrls: ['./payrol.page.scss'],
})
export class PayrolPage implements OnInit {
  clickbtn:any = "true";
  emploies:any=[];
  items:any=[];
  empstatus:any = "All";
  port:any;
  constructor(public userservice: UserService,public navCtrl: NavController,private storage: Storage) {}


  async ngOnInit() {
    // alert("working");
    await this.storage.create();
    const data = await this.storage.get('port');
    console.log(data);
    if(data == "PEEL HR LIMITED"){ 
      this.port = "PEEL HR"
    }else{
      this.port = data
    }
  }

  ionViewWillEnter(){
   this.ngOnInit(); 
   if(this.clickbtn == 'false'){
    this.clickbtnchange('false');
   }
  }
  //  ionViewDidEnter(){
  //   console.log('2');
  // }
  //  ionViewWillLeave(){
  //   console.log('3');
  // }
  //  ionViewDidLeave(){
  //   console.log('4');
  // }

  clickbtnchange(da){
    this.clickbtn = da;
    console.log(da);
    if(da == 'false'){
      this.getallemployes();
    }
  }

  getallemployes(){
     this.userservice.allemp().subscribe((data: any) => {
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
        let navigationExtras: NavigationExtras = {
              queryParams: {
                  datasend: JSON.stringify(da),
              }
          };
          this.navCtrl.navigateForward(['employdetail'], navigationExtras);
     }


}

