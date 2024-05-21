import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../api/user.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  email:any;
  pass:any;
  login_loader: Boolean = false;
  loginpress: Boolean = false;
  constructor(public toastController: ToastController,private storage: Storage,public userservice: UserService,private router: Router, private route: ActivatedRoute,public navCtrl: NavController) {

  }
  async ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['email'] && queryParams['password']) {
      this.email = queryParams['email'];
      this.pass = queryParams['password'];
      this.signin();
    } else {
      console.log("hello nisa do login")
      // this.router.navigate(['/signin']);
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

}
