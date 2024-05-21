import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  returnAuth:any;
  constructor(private auth: AuthService,public navCtrl: NavController,private storage: Storage){
    this.storage.create();
  }
  async canActivate(){
    // console.log(this.auth.Isloggedin());
    console.log(await this.storage.get('login'));
    const Authloginvalue = await this.storage.get('login')     
    if(Authloginvalue == true){
      return true;
    }else{
      this.navCtrl.navigateForward(['signin']);
      return false;
    }
  }
  
}
