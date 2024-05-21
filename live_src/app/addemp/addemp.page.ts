import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Location } from "@angular/common";
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.page.html',
  styleUrls: ['./addemp.page.scss'],
})
export class AddempPage implements OnInit {
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
  button_txt:any = "disable";
  Stat_Premium:any = 0;
  companyid=0;

  constructor(public userservice: UserService,private location: Location,public navCtrl: NavController,public toastController: ToastController,
      private router: Router,private storage: Storage
    ) { }

  async ngOnInit() {
    // await this.storage.create();
    this.companyid = await this.storage.get('companyid');
    console.log(this.companyid);
    
  }

  getallemployes(){
    debugger
    if(this.payRate != null && this.payRate != undefined && this.payRate != ""){
    this.name = this.firstname +" "+this.lastname;
     this.userservice.addemp(this.name,this.jobTitle,this.status,this.hireDate,this.dob,this.workingLocation,this.accountHolder,this.bankName,this.accountNumber,this.branchName,this.bankLocation,this.address,this.town,this.postalCode,this.
        phn,this.phn2,this.gender,this.notes,this.mi,this.payRate,this.payType,this.vacPolicy,this.deduction,this.paymentMethod,this.email,this.Stat_Premium,this.button_txt, this.companyid).subscribe((data: any) => {
          console.log(data);
          if(data.response == "done"){
            this.presentToast("Employee Add Successfully!");
            this.name = "";this.jobTitle = "";this.status = "";this.hireDate = "";this.dob = "";this.workingLocation = "";this.accountHolder = "";this.bankName = "";this.accountNumber = "";this.branchName = "";this.bankLocation = "";this.address = "";this.town = "";this.postalCode = "";this.
            phn = "";this.phn2 = "";this.gender = "";this.notes = "";this.mi = "";this.payRate = "";this.payType = "";this.vacPolicy = "";this.deduction = "";this.paymentMethod = "";this.email="";this.Stat_Premium = 0;
            this.emp = 'emp';
          }else if(data.response == "exist"){
            this.presentToast("Employee Already Exist!");
          }
      }, (err :any) => {
         console.log(err);
      });
    }else{
      this.presentToast("Please Enter Payrate!");
    }
  }

  onChange(da){
    if(da < 0){
      this.payRate = 0;
    }else{
      console.log(da);
    }
  }

  onChange1(da){
    // alert(da);
    if(da < 0){
      this.Stat_Premium = 1;
    }else{
      console.log(da);
    }
  }

  changetab(da){
    this.emp = da;
  }

  Stat_pay(){
    if(this.button_txt == "enable"){
      this.button_txt = "disable";
      this.Stat_Premium = 0;
    }else{
      this.button_txt = "enable";
      this.Stat_Premium = 1;
    }
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
  
   callfimction2(){
    var date = this.hireDate;
    this.hireDate = date.split('T')[0];
    // alert(this.hireDate);
  }
  callfimction(){
    var date = this.dob;
    this.dob = date.split('T')[0];
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
      duration: 2000, // Adjust the duration as needed
      position: 'middle', // Set the position to middl
      cssClass: 'center-toast', // Add the custom CSS class
    });
    toast.present();
  }





}
 
 