import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  email:any;
  pass:any;
  login_loader: Boolean = false;
  loginpress: Boolean = false;

  constructor(public userservice: UserService,public navCtrl: NavController,private storage: Storage, private router: Router, private route: ActivatedRoute, public toastController: ToastController,) {}


  async ngOnInit() {
    // hello Nim
      this.login_loader = true;
      const isLoggedIn = await this.storage.get('login');
      const queryParams = this.route.snapshot.queryParams;
      const existEmail = await this.storage.get('email');

      if (existEmail && (existEmail == queryParams['email'])) {
        // User is already logged in, redirect to payrol directly
        this.login_loader = false;
        this.navCtrl.navigateForward(['payrol']);
      } else {
      if (queryParams['email'] && queryParams['password']) {
        this.email = queryParams['email'];
        this.pass = queryParams['password'];
        this.signin();
      } else {
        console.log("hello do login")
        // this.router.navigate(['/signin']);
      }
    }
    await this.storage.create();
    const data = await this.storage.get('port');
    console.log(data);
    if(data == "y8hr"){ 
      this.port = "Y8HR"
    }else{
      this.port = data
    }
  }


  signin() {
    debugger
    this.loginpress = true;
    this.userservice.login(this.email, this.pass).subscribe((data: any) => {
      // console.log(data);
      if (data.response == 'Success') {
        console.log(data);
        this.login_loader = true;
        this.port = data.company;
        this.storage.set('email', this.email);
        this.storage.set('port', data.company);
        this.storage.set('companyid', data.id);
        this.userservice.setapi();
        setTimeout(() => {
          this.loginpress = false;
          this.login_loader = false;
          this.navCtrl.navigateForward(['payrol']);
          this.storage.set('login', true);
        }, 1500);

      } else {
        this.presentToast(data.response);
        this.login_loader = true;
        this.loginpress = false;
      }
    }, (err: any) => {
      this.login_loader = false;
      // console.log(err);
      this.loginpress = false;
    });
  }

  async presentToast(da) {
    const toast = await this.toastController.create({
      message: da,
      duration: 2000
    });
    toast.present();
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

