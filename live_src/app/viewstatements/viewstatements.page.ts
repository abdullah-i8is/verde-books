import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-viewstatements',
  templateUrl: './viewstatements.page.html',
  styleUrls: ['./viewstatements.page.scss'],
})
export class ViewstatementsPage implements OnInit {
  clickbtn:any = "true";
  emploies:any=[];
  items:any=[];
  empstatus:any = "All";
  port:any;
  urlid:number;
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
  company_id:any;

  


  pdfName: string; 

  constructor(private route: ActivatedRoute,public userservice: UserService,public toastController: ToastController, public navCtrl: NavController,private storage: Storage) {}

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.urlid = id 
    console.log(id,this.urlid,"fg")

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
    
    eachBankPdfTransactionId(id: number) {
      debugger;
      this.passid = id;
      console.log(id, "id");
      this.userservice.eachBankPdfTransaction(this.passid, this.company_id).subscribe(
        (data:any) => {
          console.log(data);
          if (data.response === "Transactions added successfully") {
            this.presentToast("Transactions inserted successfully");
          } else if (data.response === "Transactions already saved") {
            this.presentToast("Transactions already saved");
          } else {
            this.presentToast("Invalid Error");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
    

    editPdf(emp: any) {
      emp.isEditing = !emp.isEditing; 
    }
    
    addPdf() {
     this.isadd = true; 
    }
    
    addtopdftransactions(){
      // console.log(this.urlid,this.pdf_name,this.date,this.description,this.withdrawal,this.deposite,"pdf_name,date,description,withdrawal,deposite")
      this.userservice.addtopdftransactions(this.urlid,this.pdf_name,this.date,this.description,this.withdrawal,this.deposite,this.company_id)
      .subscribe((data:any) => {
        console.log(data.response);
        if (data.response === "Data add successfully") {
          this.presentToast("add successfully");
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

   
    edittransaction(emp: any,pdf_name:any,date:any,description:any,withdrawal:any,deposite:any) {
      debugger
      if (!emp.isEditing) {
        console.log("Edited Data:", emp, pdf_name, date, description, withdrawal, deposite);
        this.userservice.edittransaction(emp, pdf_name, date, description, withdrawal, deposite)
          .subscribe((data:any) => {
            console.log(data.response);
            if (data.response === "Data updated successfully") {
              this.presentToast("Updated successfully");
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

    delete(emp: any) {
      debugger
      if (!emp.isEditing) {
        console.log("deleted Data:",emp);
        this.userservice.deltransaction(emp)
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



    
    getallpdfs() {
      this.userservice.eachpdf(this.urlid).subscribe((data: any) => {
        this.pdfs = data.response;
        console.log(this.pdfs);
      }, (err: any) => {
        console.log(err);
      });
    }
    
}
