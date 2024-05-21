import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  totalamount: number = 0; // Initialize to a default value
  boxaccount:any = "false";
  amount:any = 0;
  formattedDate:any;
  now:any;
  constructor(public userservice: UserService) {
    this.getallemployes();
  }

  ngOnInit() {
  }

  getallemployes(){
     this.userservice.getamount().subscribe((data: any) => {
          console.log(data.balance);
          console.log(data,"data");
          this.totalamount = data.balance; // Parse the balance as a floating-point number
          console.log("this.totalamount",this.totalamount)
          this.now = new Date();
          this.formattedDate = this.now.tolocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          console.log(this.formattedDate, "this.now ");
          // this.totalamount = data.balance; // Parse the balance as a floating-point number
        }, (err :any) => {
         console.log(err);
      });
  }

  addbox(da){
    this.boxaccount = da;
  }
  
  addallemployes(){
    debugger
     this.userservice.addamount(this.amount).subscribe((data: any) => {
          console.log(data);
          this.amount = 0;
          if(data.response == "Added Successfully"){
            this.getallemployes();
          }
      }, (err :any) => {
         console.log(err);
      });
  }
   

}
