import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private storage: Storage) {

  }

  async ngOnInit() {
     await this.storage.create();
    this.storage.set('login', false);
    this.storage.set('port', 'peelhr');
  }
  navigateToSignIn() {
    console.log("hello nisa")
    // this.router.navigate(['/signin']);
  }
}
