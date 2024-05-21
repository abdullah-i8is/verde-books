import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  public inputfields = [1,2];
  constructor() { }

  ngOnInit() {
  }

  addline(){
    let length= this.inputfields.length;
    var total = length+1;
    this.inputfields.push(total);
    console.log(this.inputfields);
  }

  remove(index){
    if(index>1){
      this.inputfields.splice(index, 1);
      console.log(this.inputfields);
    }
  }
  removeAll(){
    this.inputfields = [1,2];
  }
}
