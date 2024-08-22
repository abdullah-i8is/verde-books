import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Make sure you have an AuthService
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular'; // Or your preferred navigation service
import { UserService } from '../api/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  returnAuth: any;

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private storage: Storage, 
    private navCtrl: NavController,
    public userservice: UserService,


  ) {
    this.storage.create();
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const Authloginvalue = await this.storage.get('login');

    if (Authloginvalue == true) {
      return true; // User is already logged in
    } else {
      const queryParams = route.queryParams;
      if (queryParams['email'] && queryParams['password']) {
        // Attempt login with provided credentials
        try {
          const loginResult = await this.userservice.login(queryParams['email'], queryParams['password']).subscribe((data: any) => {
            // console.log(data);
            if (data.response == 'Success') {
              console.log("success");
              
              console.log(data);
              this.storage.set('port', data.company);
              this.storage.set('companyid', data.id);
              this.userservice.setapi();
              setTimeout(() => {
                this.navCtrl.navigateForward(['payrol']);
                this.storage.set('login', true);
              }, 1500);
      
            } 
          // Assuming your AuthService's login method returns an Observable
          // if (loginResult && loginResult.response == 'Success') {
          //   // Login successful, update storage and allow access
          //   await this.storage.set('login', true);
          //   await this.storage.set('port', loginResult.company);
          //   await this.storage.set('companyid', loginResult.id);
          //   this.userservice.setapi(); // Make sure this is defined somewhere
          //   return true;
          // }
           else {
            console.log("no success");
            
            // Login failed, redirect to login page
            this.navCtrl.navigateForward(['signin']);
            return false;
          }
        })
       } catch (error) {
          // Handle login error (e.g., display an error message)
          console.error('Error during login:', error);
          this.navCtrl.navigateForward(['signin']);
          return false;
        }
      } else {
        console.log("no email and password");
        
        // No credentials provided, redirect to login page
        this.navCtrl.navigateForward(['signin']);
        return false;
      }
    }
  }
}