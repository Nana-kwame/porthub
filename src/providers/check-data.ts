import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CheckData {
  clearData: string;
  check: string;
  finalData: any = [];
  testURL: string = "http://10.10.97.199/";
  mainURL: string = "http://52.176.108.222/";
  constructor(public http: Http) {
    this.clearData = "false";
    console.log("Hello MyData Provider");
  }

  setClearData(state) {
    this.clearData = state;
  }

  login


  getTestURL() {
    return "http://10.10.97.199/";
  }

  getMainURL() {
    return this.mainURL;
  }

  getCheck() {
    this.check = this.clearData;
    return this.check;
  }
  checkClearData() {
    return this.clearData;
  }

  setFinalData(data) {
    console.log("data that came", data.length);

    for (var i = 0; i < data.length; i++) {
      this.finalData.push(data[i]);
      console.log("data that was set", this.finalData);
    }
  }

  getFinalData() {
    return this.finalData;
  }
}
