import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  clickbtn:any = "true";
  emploies:any=[];
  items:any=[];
  empstatus:any = "All";
  port:any;
  pdfs:any=[];
  company_id:any;

  pdfName: string; // Added property to store PDF name

  constructor(public userservice: UserService,private router: Router,public toastController: ToastController, public navCtrl: NavController,private storage: Storage) {}

  async ngOnInit() {
    // alert("working");
    await this.storage.create();
    const data = await this.storage.get('port');
    this.company_id = await this.storage.get('companyid')
    console.log(data, this.company_id);
    console.log(data);
    if(data == "y8hr"){ 
      this.port = "Y8HR"
    }else{
      this.port = "PEEL HR"
    }
    this.getallpdfs()
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

  selectedFile: File | null;

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
    
    uploadPDF() {
      if (this.selectedFile) {
        const postData = new FormData();
        postData.append('pdfFile', this.selectedFile, this.selectedFile.name,);
        postData.append('company_id', this.company_id); // Add company_id as a field
        this.userservice.uploadPDF(postData).subscribe(
          (data: any) => {
            console.log(data);
            if (data.response === "uploaded") {
              this.presentToast("File uploaded successfully");
              setTimeout(() => {
                location.reload();
              }, 3000); // Refresh after 3 seconds
            } else if (data.response === "already") {
              this.presentToast("File with the same name already exists");
            } else {
              this.presentToast("Invalid file or file format");
            }
          },
        );
      } else {
        this.presentToast("File not found");
      }
    }
    

    getallpdfs(){
      this.userservice.allpdf(this.company_id).subscribe((data: any) => {
           this.pdfs = data.response; 
           this.pdfs = data.response;
           console.log(this.pdfs);
       }, (err :any) => {
          console.log(err);
       });
   }


   viewTransactions(id: number) {
    console.log("EF",id)
    this.router.navigate(['/viewstatements', id]);
  }

  deletepdf(emp: any) {
    debugger
      console.log("deleted Data:",emp);
      this.userservice.delpdf(emp)
        .subscribe((data:any) => {
          console.log(data.response);
          if (data.response === "Data Deleted successfully") {
            this.presentToast("Deleted successfully");
            setTimeout(() => {
              location.reload();
            }, 3000); 
          } else {
            this.presentToast("Invalid format");
          }
        }, (err: any) => {
          console.log("Error:", err);
        });
    
  } 
}
