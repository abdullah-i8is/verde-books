import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storage: Storage) { }
  async Isloggedin(){
    this.storage.create();
    console.log(await this.storage.get('login'));
    // return !! this.storage.get('login');      
  }
}
