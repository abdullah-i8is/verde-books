import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../api/user.service';
import { Location } from "@angular/common";
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-employdetail',
  templateUrl: './employdetail.page.html',
  styleUrls: ['./employdetail.page.scss'],
})
export class EmploydetailPage implements OnInit {
  datasend:any;
  type = 'Employee Details';
  empdetail:any=[];
  empdetaillist:any = [];
  checkedemp:any = [];
  port:any;
  data:any;
  sendtopay:any;
  printshow:any='false';
  constructor(private storage: Storage,private route: ActivatedRoute,public userservice: UserService,private location: Location,public navCtrl: NavController) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.datasend = JSON.parse(params["datasend"]);
        console.log(this.datasend);
        this.storagedetail();
        this.getallemployes();
        this.getempchequelist();
    });
  }


  async storagedetail(){
    await this.storage.create();
    const data = await this.storage.get('port');
        this.data = data
        console.log(data,"compnay");
        if(data == "y8hr"){ 
          this.port = "7800"
        }else{
          this.port = "7900"
        } 
    console.log(this.port);    
  }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  getallemployes(){
     this.userservice.getempdetail(this.datasend.id).subscribe((data: any) => {
          this.empdetail = data.response;
          console.log(this.empdetail);
      }, (err :any) => {
         console.log(err);
      });
  }

  onChange(da){
    if(this.checkedemp.includes(da)) {
        var index = this.checkedemp.indexOf(da);
        if (index !== -1) {
          this.checkedemp.splice(index, 1);
        }
      } else {
        this.checkedemp.push(da);
    }
    console.log(this.checkedemp.length);
    if(this.checkedemp.length > 0){
      this.printshow = "true";
    }else{
      this.printshow = "false";
    }
  }

  printing() {
    const checkedEmpString = this.checkedemp.join('-'); // Join array elements with hyphen
    this.sendtopay = checkedEmpString + '-' + this.data; // Concatenate checkedEmpString and this.data
    console.log(this.sendtopay);
    window.open("https://verdebooks.com:" + this.port + "/api/printStub/" + this.sendtopay, '_blank');
  }
  

  getempchequelist(){
     this.userservice.getempchequelist(this.datasend.id).subscribe((data: any) => {
          this.empdetaillist = data.response;
          console.log(this.empdetaillist);
      }, (err :any) => {
         console.log(err);
      });
  }

   myBackButton(){
     this.location.back();
   }

   updateprofile(){
       let navigationExtras: NavigationExtras = {
              queryParams: {
                  id: JSON.stringify(this.datasend.id),
              }
          };
          this.navCtrl.navigateForward(['editprofile'], navigationExtras);
   }

}
