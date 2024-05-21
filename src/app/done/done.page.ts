import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})

export class DonePage implements OnInit { 
  values:any; 
  today:any; 
  totalval:any; 
  port:any;
  checkedemp:any=[]; 
  organization: any;
  constructor(private route: ActivatedRoute,private location: Location,private storage: Storage) { 
    
  } 

  async ngOnInit() { 
    await this.storage.create();
    this.organization = await this.storage.get('port');
    console.log(this.organization);
    if(this.organization == "y8hr"){ 
      this.port = "7800"
    }else{
      this.port = "7900"
    }
    this.onrun(); 
  } 

  printing(){
    console.log(this.checkedemp);
    for(let i=0; i<this.totalval;i++){
    window.open("https://verdebooks.com:"+this.port+"/api/printStub/"+this.values[i].id+'-'+this.organization,'_blank');
    }
  }

  onrun(){
    this.route.queryParams.subscribe(params => {
        this.values = JSON.parse(params["values"]);
        this.today = JSON.parse(params["today"]);
        
        console.log(this.values);
        this.totalval = this.values.length;
        for(let i=0; i<this.totalval;i++){
          this.values[i].organization = this.organization;
          this.checkedemp.push(this.values[i].id);
        }
    });
  }

   myBackButton(){
    this.location.back();
  } 

}
