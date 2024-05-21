import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Location } from "@angular/common";
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  id:any;
  name :any;
  jobTitle :any;
  status :any = "No Status";
  hireDate :any;
  dob :any;
  workingLocation :any;
  accountHolder :any;
  bankName :any;
  accountNumber :any;
  branchName :any;
  bankLocation :any;
  address :any;
  town :any;
  postalCode :any;
  phn :any;
  phn2 :any;
  gender :any;
  notes :any;
  mi :any;
  payRate :any;
  payType :any;
  vacPolicy :any;
  deduction :any;
  paymentMethod :any;
  email :any; 
  emp:any = "emp";
  firstname:any;
  lastname:any;
  defaulthours:any;
  hoursperday:any;  
  provice:any;
  startingdate:any;
  button_txt:any;
  Stat_Premium:any; 
  constructor(public userservice: UserService,private location: Location,public toastController: ToastController,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.id = JSON.parse(params["id"]);
        console.log(this.id);
        this.getinfot(this.id)
    });
  }

  getinfot(da){
    debugger
    this.userservice.getempdetail(da).subscribe((data: any) => {
          console.log(data);
          console.log(data.name);
          this.name = data.response.name;
          this.jobTitle = data.response.jobTitle;
          this.status = data.response.status;
          this.hireDate = data.response.hireDate;
          this.dob = data.response.dob;
          this.workingLocation = data.response.workingLocation;
          this.accountHolder = data.response.accountHolder;
          this.bankName = data.response.bankName;
          this.accountNumber = data.response.accountNumber;
          this.branchName = data.response.branchName;
          this.bankLocation = data.response.bankLocation;
          this.address = data.response.address;
          this.town = data.response.town;
          this.postalCode = data.response.postalCode;
          this.phn = data.response.phn;
          this.phn2 = data.response.phn2;
          this.gender = data.response.gender;
          this.notes = data.response.notes;
          this.mi = data.response.mi;
          this.payRate = data.response.payRate;
          this.payType = data.response.payType;
          this.vacPolicy = data.response.vacPolicy;
          this.deduction = data.response.deduction;
          this.paymentMethod = data.response.paymentMethod;
          this.email = data.response.email;
          this.button_txt = data.response.shiftPremiumStatus;
          this.Stat_Premium = data.response.shiftPremiumPayRate;
      }, (err :any) => {
         console.log(err);
      }); 
  }


  onChange(da){
    if(da < 0){
      this.payRate = 0;
    }else{
      console.log(da);
    }
  }

  onChange1(da){
    if(da < 0){
      this.Stat_Premium = 1;
    }else{
      console.log(da);
    }
  }

  getallemployes(){
    if(this.payRate > 0){
     this.userservice.updemp(this.id,this.name,this.jobTitle,this.status,this.hireDate,this.dob,this.workingLocation,this.accountHolder,this.bankName,this.accountNumber,this.branchName,this.bankLocation,this.address,this.town,this.postalCode,this.
        phn,this.phn2,this.gender,this.notes,this.mi,this.payRate,this.payType,this.vacPolicy,this.deduction,this.paymentMethod,this.email,this.Stat_Premium,this.button_txt).subscribe((data: any) => {
          console.log(data);
          this.presentToast(data.response);
          this.emp = 'emp';
          this.location.back();
          // if(data.response == "done"){
          //   this.presentToast("Employee Add Successfully");
          // }else if(data.response == "exist"){
          //   this.presentToast("Employee Already Exist");
          // }
      }, (err :any) => {
         console.log(err);
      });
    }else{
      this.presentToast("Please enter valid payrate");
    } 
  }

   Stat_pay(){
    if(this.button_txt == "enable"){
      this.button_txt = "disable";
      this.Stat_Premium = 0;
    }else{
      this.button_txt = "enable";
      this.Stat_Premium = 1
    }
  }

  changetab(da){
    this.emp = da;
  }

   callfimction2(){
    var date = this.hireDate;
    this.hireDate = date.split('T')[0];
    // alert(this.hireDate);
  }
  callfimction(){
    var date = this.dob;
    this.dob = date.split('T')[0];
  }

  changedone(){
    if(this.emp == 'emp'){
      this.emp = 'profile';
    }else if(this.emp == 'profile'){
      this.emp = 'bank'
    } else {
      this.getallemployes();
    }    
  }

  canclechangedone(){
    if(this.emp == 'bank'){
      this.emp = 'profile';
    }else if(this.emp == 'profile'){
      this.emp = 'emp'
    } else {
      this.location.back();
    }    
  }

  myBackButton(){
    this.location.back();
  }

  async presentToast(da) {
    const toast = await this.toastController.create({
      message: da,
      duration: 2000
    });
    toast.present();
  }
}
