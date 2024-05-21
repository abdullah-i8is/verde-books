import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  email:any;
  pass:any;
  login_loader: Boolean = false;
  loginpress: Boolean = false;
  constructor(public toastController: ToastController,public navCtrl: NavController,public userservice: UserService,private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.storage.set('login', false);
    this.storage.set('port', 'peelhr');
  }
   ionViewWillEnter(){
    console.log("working");
  }

  signin(){
    debugger
    this.loginpress = true;
    this.userservice.login(this.email,this.pass).subscribe((data: any) => {
        // console.log(data);
        if(data.response == 'Success'){
          console.log(data);
          this.login_loader = true;
          this.storage.set('port', data.company);
          this.storage.set('companyid', data.id);
          this.userservice.setapi();
          setTimeout(() => {
              this.loginpress = false;
              this.login_loader = false; 
              this.navCtrl.navigateForward(['payrol']);
              this.storage.set('login', true);
          }, 1500);
              
        }else{
          this.presentToast(data.response);
          this.login_loader = true;
          this.loginpress = false;
        }
    }, (err :any) => {
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

  handleLogin(da){
    console.log(da);
  }

  onEnter(){
    alert("asd");
  }

}
