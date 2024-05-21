import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:any;
  company_id:any;
  // https://:7900/api/allEmployeeshttps://verdebooks.com:7900/api/runPayRoll
  // https://clickhr.ca:7000/api/checkhousesweep
  // https://clickhr.ca:7000/api/checkhousesweep
  constructor(private http: HttpClient,public loadingController: LoadingController,private storage: Storage) {
    const postData = new FormData();
    const apiUrl = 'https://verdebooks.com:7900/api/';

    this.http.get(apiUrl).subscribe(
      (response) => {
        console.log('API Response:', response);
        // Handle the response data here
      },
      (error) => {
        console.error('API Error:', error);
        // Handle any errors that may occur
      }
    );
    var res = this.http.get("https://verdebooks.com:7900/api/")
    // https://verdebooks.com:7900/api/allEmployees
    console.log(res);
    console.log("hi")
  }

  async ngOnInit() { 
    var result;
    await this.storage.create();
    const data = await this.storage.get('port');
    this.company_id = await this.storage.get('companyid')
    console.log(data, this.company_id);
    if(data == "y8hr"){ 
      result = "https://verdebooks.com:7900/api/";
      console.log(result);
    }else{
      result = "https://verdebooks.com:7900/api/";
      console.log(result);
    }
    return result;
  } 

  login(email,pass){ 
      // this.ngOnInit().then((res) => {
      //  console.log(res);
      //  this.url = res;
      // });
      const postData = new FormData();
      postData.append('email' , email);
      postData.append('password' , pass);
      return this.http.post('https://verdebooks.com:7900/api/login', postData);
  }

  setapi(){
    this.ngOnInit().then((res) => {
       this.url = res;
       console.log(res);
    });
    // return this.url;
  }

  backdata(employees){
    const postData = new FormData();
    postData.append('employees' , employees);
    return this.http.post(this.url + 'editStub', postData);
  }

  addamount(amount){
    const postData = new FormData();
    postData.append('balance' , amount);
    postData.append('companyid', this.company_id)
    return this.http.post(this.url + 'addBalance', postData);
  }

  addemp(name,jobTitle,status,hireDate,dob,workingLocation,accountHolder,bankName,accountNumber,branchName,bankLocation,address,town,postalCode,
        phn,phn2,gender,notes,mi,payRate,payType,vacPolicy,deduction,paymentMethod,email,Stat_Premium,button_txt, companyid){
          debugger
    const postData = new FormData();
    postData.append('name' , name);
    postData.append('jobTitle' , jobTitle);
    postData.append('status' , status);
    postData.append('hireDate' , hireDate);
    postData.append('dob' , dob);
    postData.append('workingLocation' , workingLocation);
    postData.append('accountHolder' , accountHolder);
    postData.append('bankName' , bankName);
    postData.append('accountNumber' , accountNumber);
    postData.append('branchName' , branchName);
    postData.append('bankLocation' , bankLocation);
    postData.append('address' , address);
    postData.append('town' , town);
    postData.append('postalCode' , postalCode);
    postData.append('phn' , phn);
    postData.append('phn2' , phn2);
    postData.append('gender' , gender);
    postData.append('notes' , notes);
    postData.append('mi' , mi);
    postData.append('payRate' , payRate);
    postData.append('payType' , payType);
    postData.append('vacPolicy' , vacPolicy);
    postData.append('deduction' , deduction);
    postData.append('paymentMethod' , paymentMethod);
    postData.append('email' , email);
    postData.append('shiftPremiumPayRate' , Stat_Premium);
    postData.append('shiftPremiumStatus' , button_txt);
    postData.append('companyid', companyid);
    return this.http.post(this.url + 'addEmployee', postData);
  }

  updemp(id,name,jobTitle,status,hireDate,dob,workingLocation,accountHolder,bankName,accountNumber,branchName,
    bankLocation,address,town,postalCode,phn,phn2,gender,notes,mi,payRate,payType,vacPolicy,deduction,paymentMethod,email,Stat_Premium,button_txt){
    const postData = new FormData();
    postData.append('id' , id);
    postData.append('name' , name);
    postData.append('jobTitle' , jobTitle);
    postData.append('status' , status);
    postData.append('hireDate' , hireDate);
    postData.append('dob' , dob);
    postData.append('workingLocation' , workingLocation);
    postData.append('accountHolder' , accountHolder);
    postData.append('bankName' , bankName);
    postData.append('accountNumber' , accountNumber);
    postData.append('branchName' , branchName);
    postData.append('bankLocation' , bankLocation);
    postData.append('address' , address);
    postData.append('town' , town);
    postData.append('postalCode' , postalCode);
    postData.append('phn' , phn);
    postData.append('phn2' , phn2);
    postData.append('gender' , gender);
    postData.append('notes' , notes);
    postData.append('mi' , mi);
    postData.append('payRate' , payRate);
    postData.append('payType' , payType);
    postData.append('vacPolicy' , vacPolicy);
    postData.append('deduction' , deduction);
    postData.append('paymentMethod' , paymentMethod);
    postData.append('email' , email);
    postData.append('shiftPremiumPayRate' , Stat_Premium);
    postData.append('shiftPremiumStatus' , button_txt);
    return this.http.post(this.url + 'editEmployeeProfile', postData);
  }

  getempchequelist(id){
    const postData = new FormData();
    // postData.append('phone' , number);https://verdebooks.com:7900/api/employeeStubList/<id>
    // https://verdebooks.com:7900/api/employeeProfile/<id>
    return this.http.post(this.url + 'employeeStubList/'+id, postData);
  }

  getempdetail(id){
    const postData = new FormData();
    // postData.append('phone' , number);
    // https://verdebooks.com:7900/api/employeeProfile/<id>
    return this.http.post(this.url + 'employeeProfile/'+id, postData);
  }

  allemp(){
    const postData = new FormData();
    postData.append('companyid' , this.company_id);
    return this.http.post(this.url + 'allEmployees', postData);
  }

  allpaychque(){
    const postData = new FormData();
    // postData.append('phone' , number);https://verdebooks.com:7900/api/payChequeList
    return this.http.post(this.url + 'payChequeList', postData);
  }

  getamount(){
    const postData = new FormData();
    postData.append('companyid' , this.company_id);
    return this.http.post(this.url + 'currentBalance', postData);
  }

  alldates(date){
    console.log(date);
    const postData = new FormData();
    // postData.append('phone' , number);
    return this.http.post(this.url + 'getDates/'+date, postData);
  }

  addorg(orgname,street, postalCode, city, email, password ){
    const postData = new FormData();
    postData.append('orgname', orgname);
    postData.append('street', street);
    postData.append('postalcode', postalCode);
    postData.append('city', city);
    postData.append('email', email);
    postData.append("password",password);
    return this.http.post(this.url + 'addOrganization', postData)
  }

  sendpayroll(employees,payHours,otHours,stat,memo,payDate,week,statPremiumHours){
    debugger
    const postData = new FormData();
    postData.append('employees' , employees);
    postData.append('payHours' , payHours);
    postData.append('otHours' , otHours);
    postData.append('stat' , stat);
    postData.append('memo' , memo);
    postData.append('payDate' , payDate);
    postData.append('week' , week);
    postData.append('companyid', this.company_id);
    postData.append('statPremiumHours' , statPremiumHours);
    return this.http.post(this.url + 'runPayRoll', postData);
  }
  uploadPDF(pdfFile: FormData) {
    return this.http.post(this.url + 'uploadPDF', pdfFile);
  }
  
  allpdf(company_id){
    const postData = new FormData();
    postData.append('company_id' , company_id);
    return this.http.post(this.url + 'allbankpdfs', postData);
  }
  
  eachBankPdfTransaction(id,company_id) {
    const postData = new FormData();
    debugger;
    return this.http.post(this.url + 'eachbankpdfstransaction/'+id+company_id, postData);
  }
  addtopdftransactions(id: any, pdf_name: any, date: any, description: any, withdrawal: any, deposite: any,company_id:any) {
    debugger
    const postData = new FormData();
    postData.append('id', id);
    postData.append('pdf_name', pdf_name);
    postData.append('date', date);
    postData.append('description', description);
    postData.append('withdrawal', withdrawal);
    postData.append('deposite', deposite);
    postData.append('company_id', company_id);

  
    return this.http.post(this.url + 'addtopdftransactions', postData);
  }
  edittransaction(id: any, pdf_name: any, date: any, description: any, withdrawal: any, deposite: any) {
    debugger
    const postData = new FormData();
    postData.append('id', id);
    postData.append('pdf_name', pdf_name);
    postData.append('date', date);
    postData.append('description', description);
    postData.append('withdrawal', withdrawal);
    postData.append('deposite', deposite);
  
    return this.http.post(this.url + 'edittransaction', postData);
  }
  
  deltransaction(id: any) {
    debugger
    const postData = new FormData();
    postData.append('id', id);
    return this.http.post(this.url + 'deltransaction', postData);
  }
  eachpdf(urlid){
    const postData = new FormData();
    postData.append('urlid', urlid);
    return this.http.post(this.url + 'bankpdfs', postData);
  }
  stubTransactionalhistory(id:any){
    debugger
    const postData = new FormData();
    postData.append('id', id);
    return this.http.post(this.url + 'stubTransactionalhistory', postData);
  }
  eachstubmonth(month:any,company_id:any) {
    debugger
    const postData = new FormData();
    postData.append('month', month);
    postData.append('company_id', company_id);
    return this.http.post(this.url + 'eachstubmonth', postData);
  }
  delstubtransaction(id: any) {
    debugger
    const postData = new FormData();
    postData.append('id', id);
    return this.http.post(this.url + 'delstubtransaction', postData);
  }
  delpdf(id: any) {
    debugger
    const postData = new FormData();
    postData.append('id', id);
    return this.http.post(this.url + 'delpdf', postData);
  }
}

