import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserService } from '../api/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements OnInit {

  orgname:any;
  street:any;
  postalCode:any;
  city:any;
  email:any;
  password:any;

  constructor(public userservice: UserService,private location: Location, public toastController: ToastController,  private router: Router
    ) { }

  ngOnInit() {}

  async presentToast(da) {
    const toast = await this.toastController.create({
      message: da,
      duration: 2000, // Adjust the duration as needed
      position: 'middle', // Set the position to middl
      cssClass: 'center-toast', // Add the custom CSS class
    });
    toast.present();
  }

  canclechangedone(){
      this.location.back();   
  }

  saveOrganization(){
    debugger
    
     this.userservice.addorg(this.orgname,this.street,this.postalCode,this.city, this.email, this.password).subscribe((data: any) => {
          console.log(data);
          if(data.response == "done"){
            this.presentToast("Organization Added Successfully!");
            this.orgname = "";this.street = "";this.postalCode = "";this.city = "";
          }else if(data.response == "exist"){
            this.presentToast("Organization Already Exist!");
          }
      }, (err :any) => {
         console.log(err);
      });
   
  }

}
