import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-viewstubtransactions',
  templateUrl: './viewstubtransactions.page.html',
  styleUrls: ['./viewstubtransactions.page.scss'],
})
export class ViewstubtransactionsPage implements OnInit {
  clickbtn:any = "true";
  emploies:any=[]; 
  items:any=[];
  empstatus:any = "All";
  port:any;
  urlmonth:any;
  pdfs:any=[];
  passid:number;
  emppdf_name:any;
  empdate:any;
  empdescription:any;
  empwithdrawal:any;
  empdeposite:any;
  isadd:any;
  pdf_name: any = ''; 
  date: any = ''; 
  description: any = ''; 
  withdrawal: any = ''; 
  deposite: any = ''; 
  monthhistory : any;
  company_id:any;
  
  


  pdfName: string; 
 
  constructor(private route: ActivatedRoute,public userservice: UserService,public toastController: ToastController, public navCtrl: NavController,private storage: Storage) {}

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.urlmonth = id
    console.log(this.urlmonth,"urlmonth")
    this.openMonthDetails(this.urlmonth)


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
  
    

    openMonthDetails(month:any){
      console.log(month,"month")
      this.userservice.eachstubmonth(month).subscribe((data:any) => {
        this.monthhistory = data.response
        console.log(this.monthhistory);
      }, (err: any) => {
        console.log("Error:", err);
      });

    }   
    
    delete(emp: any) {
      debugger
        console.log("deleted Data:",emp);
        this.userservice.delstubtransaction(emp)
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