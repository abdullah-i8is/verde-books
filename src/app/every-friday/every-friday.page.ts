import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../api/user.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
// import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { Location } from "@angular/common";
import { ToastController } from '@ionic/angular';
// import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-every-friday',
  templateUrl: './every-friday.page.html',
  styleUrls: ['./every-friday.page.scss'],
})
export class EveryFridayPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  items:any;
  rhours:Array<number> = [];
  hhours :Array<number> = [];
  memo :Array<string> = [];
  othours :Array<number> = [];
  phours :Array<number>=[];
  checkedItems = [];
  checkedemp = [];
  checkedpayhours = [];
  checkedothours  = []; 
  checkedhhours = [];
  checkedmemo = []; 
  statPremiumHours = [];
  previewlist = [];
  totalsum = [];
  date:any;
  startdate:any;
  enddate:any;
  alldate:any=[];
  week:any = "2023";
  dateValue = '';
  mydate: any;
  totalval:any = 0;
  isChecked:Array<boolean> = [];
  toastvall:any = "false";
  yearloop:any =[];
  weekfinal:any = 'false';
  emploiesdata:any=[];
  dateselected:any = "none1";
  valuechange:any = "false";
  valuechangeon:any = "false";
  toastval:any;
  totalamount:any;
  totalsumvalue:any = 0;
  checkboxvalue:any = [];
  totalfinalvalue:any = 0;
  constructor(public userservice: UserService,public alertController: AlertController,
    public navCtrl: NavController,private location: Location,public toastController: ToastController) {

    this.getallemployes();
    this.getallemployesamount();  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    // todayy = mm + '/' + dd + '/' + yyyy;
    // document.write(today);
    this.date = yyyy + '-' + mm + '-' + dd 

    this.getalldate(yyyy,'');
    

    console.log(this.mydate);
    for(let i=yyyy;i>1999;i--){
      this.yearloop.push(i); 
    }
    console.log(this.yearloop);
    console.log(this.week);

  }

  ngOnInit() {
  }

  ionViewDidEnter(){
   this.checkedpayhours = [];
    this.checkedothours = [];
    this.checkedhhours = [];
    this.checkedmemo = [];
    this.statPremiumHours = [];   
  }

  getallemployesamount(){
     this.userservice.getamount().subscribe((data: any) => {
          console.log(data.balance);
          this.totalamount = data.balance;
      }, (err :any) => {
         console.log(err);
      });
  }

  async call_alert(){
    // alert("Please enter hours");
     const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Important message',
      message: 'Fill all the fields!',
      buttons: ['OK']
    });

    await alert.present();
  }
  myBackButton(){
    this.location.back();
  }

  OnChange1(da){
    this.valuechangeon = 'true';
    // this.dateselected = "";
    this.getalldate(this.week,da);
  }

  onchangeclick(){
    this.dateselected = "";
    this.valuechange = "true";
  }

  onCancel(){
    alert("working");
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Please ',
      inputs: [
        {
          name: 'Year',
          type: 'text',
          placeholder: '2022'
        },
      ],
      buttons: [
       {
          text: 'Ok',
          handler: (data) => {
            // console.log('Confirm Ok');
            console.log(data['Year']);
            // this.getalldate(data['Year']);
          }
        }
      ]
    });

    await alert.present();
  }
  handleStartDate(selectedDate: any) {
    if (selectedDate) {
      console.log('Selected Start Date:', selectedDate);
        const result = selectedDate.substring(0, 10);
      console.log('Formatted Start Date:', result);
        this.startdate = result;
    } else {
      console.error('No start date selected');
    }
  }
  
  handleEndDate(selectedDate: any) {
    if (selectedDate) {
      console.log('Selected End Date:', selectedDate);
  
      // Extracting the date portion (YYYY-MM-DD)
      const result = selectedDate.substring(0, 10);
      console.log('Formatted End Date:', result);
  
      // Storing the formatted end date
      this.enddate = result;
  
      // Generating the date range
      this.dateselected = `${this.startdate} - ${this.enddate}`;
      console.log('Date Range:', this.dateselected);
    } else {
      console.error('No end date selected');
    }
  }
  
  
  
  payratedate(da){
    console.log(da);
    let result = da.substring(0, 10);
    console.log(result);
    this.mydate = result;
    this.date = this.mydate;
  }

  async valuecheck(empid,rhours,othours,hhours,memo,emptotal,i,phours){
    debugger
    // this.rhours[i] = 1;
    if((this.checkboxvalue.find(x => x.id == i)?.id) == i){
        const index = this.checkboxvalue.findIndex(object => {
          return object.id === i;
        });
        console.log(emptotal);
        if (index !== -1) {
          this.checkboxvalue[index].total = 0;
        }
        console.log(this.checkboxvalue);
        this.totalfinalvalue = 0;  
        for(let k=0;k<this.checkboxvalue.length;k++){
          this.totalfinalvalue = this.totalfinalvalue +  parseInt(this.checkboxvalue[k].total);
        }
    }
    if(this.checkedemp.includes(empid)) {
       var index = this.checkedemp.indexOf(empid); 
       var index5 = this.isChecked.indexOf(i);
        var index1 = this.checkedpayhours.indexOf(rhours);
        var index2 = this.checkedothours.indexOf(othours);
        var index3 = this.checkedhhours.indexOf(hhours);
        var index4 = this.checkedmemo.indexOf(memo);
        
        var index6 = this.statPremiumHours.indexOf(phours);
        var index7 = this.previewlist.indexOf(i);
        if (index !== -1) {
          this.checkedemp.splice(index, 1); 
        }
        if (index1 !== -1) {
          this.checkedpayhours.splice(index1, 1);
        }
        if (index2 !== -1) {
          this.checkedothours.splice(index2, 1);
        }
        if (index3 !== -1) {
          this.checkedhhours.splice(index3, 1);
        }
        if (index4 !== -1) {
          this.checkedmemo.splice(index4, 1);
        }
        if(index6 !== -1){
          this.statPremiumHours.splice(index6,1)
        }
        if(index7 !== -1){
          this.previewlist.splice(index7,1);
        }
        this.rhours[i] = 0;
        this.othours[i] = 0;
        this.hhours[i] = 0;
        this.memo[i] = '';
        this.phours[i] = 0;
        console.log(this.checkedemp);
        console.log(this.checkedpayhours);
        console.log(this.checkedothours);
        console.log(this.checkedhhours);
        console.log(this.checkedmemo);
        console.log(this.statPremiumHours);
    }else{
      this.checkedemp.push(empid);
      this.previewlist.push(i);
    }
  }

  async onChange(empid,rhours,othours,hhours,memo,emptotal,i,phours,payRate,shiftPremiumPayRate) {   
    debugger  
      if(rhours == undefined){
        rhours = 0;
      }
      if(othours == undefined){
        othours = 0;
      }
      if(hhours == undefined){
        hhours = 0;
      }
      if(phours == undefined){
        phours = 0;
      }
      if (shiftPremiumPayRate === undefined) {
        shiftPremiumPayRate = 0;
    }
      payRate = parseInt(payRate, 10);
      var totalsum = ((payRate*rhours)+(othours*(payRate*1.5))+(payRate*hhours)+(shiftPremiumPayRate*phours));
      // console.log(totalsum);
      
      // console.log(emptotal);
        
      if(totalsum < 0){
        totalsum = 0;
      }  
      // alert(totalsum);
      if((this.checkboxvalue.find(x => x.id == i)?.id) == i){
          const index = this.checkboxvalue.findIndex(object => {
            return object.id === i;
          });
          // console.log(emptotal);
          if (index !== -1) {
            this.checkboxvalue[index].total = totalsum;
          }
          // console.log(this.checkboxvalue);
      }else{
        this.checkboxvalue.push({'id':i,'total':totalsum})
        // await console.log(this.checkboxvalue);
      }
      console.log(this.checkboxvalue);
      this.totalfinalvalue = 0;  
      for(let k=0;k<this.checkboxvalue.length;k++){
        this.totalfinalvalue = this.totalfinalvalue +  parseInt(this.checkboxvalue[k].total);
      }

      // alert(totalsum);
      if(rhours > 500 || rhours < 0){
        this.rhours[i] = 0;
        this.onChange(empid,0,othours,hhours,memo,emptotal,i,phours,payRate,shiftPremiumPayRate);
        this.presentToast("Minimum hours 1 and maximum hours 500");
      }
      if(othours > 500 || othours < 0){
        this.othours[i] = 0;
        this.onChange(empid,rhours,0,hhours,memo,emptotal,i,phours,payRate,shiftPremiumPayRate);
        this.presentToast("Minimum hours 1 and maximum hours 500");
      }
      if(hhours > 500 || hhours < 0){
        this.hhours[i] = 0;
        this.onChange(empid,rhours,othours,0,memo,emptotal,i,phours,payRate,shiftPremiumPayRate);
        this.presentToast("Minimum hours 1 and maximum hours 500");
      }
      if(phours > 500 || phours < 0){
        this.phours[i] = 0; 
        this.onChange(empid,rhours,othours,hhours,memo,emptotal,i,0,payRate,shiftPremiumPayRate);
        this.presentToast("Minimum hours 1 and maximum hours 500");
      }

      // if(this.checkedemp.includes(empid)) {
      //   console.log("////////////////");  
      //   console.log(this.totalval);
      //   console.log(emptotal);
      //   console.log("////////////////");  
      //   this.totalval = this.totalval-emptotal;
        
      //   var index1 = this.checkedpayhours.indexOf(rhours);
      //   var index2 = this.checkedothours.indexOf(othours);
      //   var index3 = this.checkedhhours.indexOf(hhours);
      //   var index4 = this.checkedmemo.indexOf(memo);
        
      //   var index6 = this.statPremiumHours.indexOf(phours);
        
      //   if (index1 !== -1) {
      //     this.checkedpayhours.splice(index1, 1);
      //   }
      //   if (index2 !== -1) {
      //     this.checkedothours.splice(index2, 1);
      //   }
      //   if (index3 !== -1) {
      //     this.checkedhhours.splice(index3, 1);
      //   }
      //   if (index4 !== -1) {
      //     this.checkedmemo.splice(index4, 1);
      //   }
      //   if(index6 !== -1){
      //     this.statPremiumHours.splice(index6,1)
      //   }
      //   console.log(this.checkedemp);
      //   console.log(this.checkedpayhours);
      //   console.log(this.checkedothours);
      //   console.log(this.checkedhhours);
      //   console.log(this.checkedmemo);
      //   console.log(this.statPremiumHours);
      // } else {

      //   console.log("////////////////");  
      //   console.log(this.totalval);
      //   console.log(emptotal);
      //   console.log("////////////////");  

      //   this.totalval = this.totalval+emptotal;
        
      //   this.checkedpayhours.push(rhours);
      //   this.checkedothours.push(othours);
      //   this.checkedhhours.push(hhours);
      //   this.checkedmemo.push(memo);
      //   this.statPremiumHours.push(phours);
      //   console.log(this.checkedemp);
      //   console.log(this.checkedpayhours);
      //   console.log(this.checkedothours);
      //   console.log(this.checkedhhours);
      //   console.log(this.checkedmemo);
      //   console.log(this.statPremiumHours);
      // }
  }


  callallvalue(){
    debugger
      // console.log(this.isChecked);
      // console.log(this.previewlist);
      var array=[];
      for(let i=0;i<this.previewlist.length;i++){
        if(this.rhours[this.previewlist[i]] == undefined){
          this.rhours[this.previewlist[i]] = 0;
        }
        if(this.othours[this.previewlist[i]] == undefined){
          this.othours[this.previewlist[i]] = 0;
        }
        if(this.hhours[this.previewlist[i]] == undefined){
          this.hhours[this.previewlist[i]] = 0;
        }
        if(this.memo[this.previewlist[i]] == undefined){
          this.memo[this.previewlist[i]] = "";
        }
        if(this.phours[this.previewlist[i]] == undefined){
          this.phours[this.previewlist[i]] = 0
        }
        // console.log(this.rhours[i]);
        // console.log(this.rhours[i] > 0 || this.othours[i] > 0 || this.hhours[i] > 0 || this.phours[i] > 0);
        if(this.rhours[this.previewlist[i]] > 0 || this.othours[this.previewlist[i]] > 0 || this.hhours[this.previewlist[i]] > 0 || this.phours[this.previewlist[i]] > 0){
          this.checkedpayhours.push(this.rhours[this.previewlist[i]]);
          this.checkedothours.push(this.othours[this.previewlist[i]]);
          this.checkedhhours.push(this.hhours[this.previewlist[i]]);
          this.checkedmemo.push(this.memo[this.previewlist[i]]);
          this.statPremiumHours.push(this.phours[this.previewlist[i]]);
        }else{
          console.log(this.checkedemp[i]);
          console.log(this.checkedemp[i]);
          this.isChecked[this.previewlist[i]] = false;
          array.push(this.checkedemp[this.previewlist[i]]);
          // this.checkedemp.splice(i, 1);
        }
      }
      console.log(array);
      console.log(this.checkedemp);
      for(let i=0;i<array.length;i++){
        var index = this.checkedemp.indexOf(array[i]);
        // alert(array[i]);
        this.checkedemp.splice(index, 1);
      }
      //   console.log(this.checkedemp);
      //   console.log(this.checkedpayhours);
      //   console.log(this.checkedothours);
      //   console.log(this.checkedhhours);
      //   console.log(this.checkedmemo);
      //   console.log(this.statPremiumHours);
      this.sendpayrolll();
  } 

  getallemployes(){
     this.userservice.allemp().subscribe((data: any) => {
          // this.emploies = data.response; 
          this.items = data.response;
          console.log(this.items);
      }, (err :any) => {
         console.log(err);
      });
  }
  // alldates
  getalldate(date,da){
       this.userservice.alldates(date).subscribe((data: any) => {
          this.emploiesdata = data.dateRanges; 
          console.log(this.emploiesdata);
          if(da != 'true'){
            this.dateselected = this.emploiesdata[0];
          }
      }, (err :any) => {
         console.log(err);
      });
  }

  sendpayrolll(){
    debugger
    console.log(this.dateselected);
    if(this.dateselected){
      console.log(this.checkedemp);
      if(this.checkedemp.length > 0 &&
          this.checkedpayhours.length > 0 &&
          this.checkedothours.length > 0 &&
          this.checkedhhours.length > 0 && this.totalfinalvalue > 0){
          console.log(this.checkedpayhours);
          
          if(this.checkedemp.length == 0){
            this.toastvall = "false";
            this.presentToast("Please Select Any Employee");
          }else{
            if(this.dateselected == "none1"){            
              this.dateselected = this.emploiesdata[this.emploiesdata.length -1];
              // alert(this.getalldate);
              console.log(this.dateselected);
            }
            if(!this.mydate){
              this.mydate = this.date;
              // alert("working");
            }
            this.toastvall = "true";
            this.userservice.sendpayroll(this.checkedemp,this.checkedpayhours,this.checkedothours,this.checkedhhours,this.checkedmemo,
              this.mydate,this.dateselected,this.statPremiumHours).subscribe((data: any) => {
                console.log(data);
                let navigationExtras: NavigationExtras = {
                    queryParams: {
                        datasend: JSON.stringify(data),
                        mydate: JSON.stringify(this.mydate),
                        week: JSON.stringify(this.week),
                    }
                };
                this.navCtrl.navigateForward(['review'], navigationExtras);
                this.toastvall = "false";
            }, (err :any) => {
               console.log(err);
            });
          }

      }else{
        this.presentToast("Invalid value!");
      }
    }else{
      this.presentToast("Please select pay week");  
    }
  }

  async presentToast(da) {
    debugger
     this.toastval = await this.toastController.create({
      message: da,
      duration: 2000
    });
    this.toastval.present();
  }


  // closeloading(){

  // }

}
