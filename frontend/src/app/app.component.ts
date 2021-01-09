import { MatCheckboxModule } from '@angular/material';
import { Component } from '@angular/core'
import { ApiService } from './api.service'

@Component({
  selector: 'app-root',
  template: `
<div>
  <h1>
    Grocery Cart
  </h1>
  <form>
    <mat-form-field  style="width: 80%;margin:10%;">
      <input type="text" [(ngModel)]="list" name="grocery" matInput placeholder="Groceries Needed">
    </mat-form-field>
    <br>
      <button id="submitButton" (click)="post()" mat-raised-button color="primary">Add</button>
  </form>
  <br>
  <div ng-app="app" ng-controller="ctrl"> 
    <div *ngFor="let groceries of this.result">
      <mat-checkbox [checked]= groceries.checked (change)="checkThis($event)">{{groceries.grocery}}</mat-checkbox>
    </div>
  </div>
</div>`
})
export class AppComponent {
  constructor(private apiService: ApiService) { }
  result
  grocery = ""
  ngOnInit() {
    if (this.apiService.readCookie("userId") == null || this.apiService.readCookie("userId") == "null") {
      this.apiService.createCookie("userId", this.apiService.randomString(16, "Aa#"), 1000)
    }
    var grocery = ""
    this.apiService.getGroceries(grocery, this.apiService.readCookie("userId")).subscribe(data => {
      this.result = data
      console.log(this.result)
    })
  }

  list = ''
  post() {
  var flag = 0;
    for (var i = 0; i < this.result.length; i++) {
      if (this.result[i].grocery.toLowerCase() == this.list.toLowerCase()) {
        flag = 1
      }
    }
    if (flag == 0) {
      var response = this.apiService.postGroceries({grocery: this.list, checked: true, userId: this.apiService.readCookie("userId"), counter: 1})
      this.result.unshift({'id':'','grocery':this.list,'checked':true});
      this.list = '';
    }
    else {
      this.apiService.updateGroceries({grocery: this.list, checked: true, userId: this.apiService.readCookie("userId"), counter: 1})
    }
    //setTimeout(location.href = location.href, 5000);

  }
  
  checkThis(e){
    var grocery = document.getElementById(e.source.id).parentNode.textContent;
    var checked = (e.checked);
    
    grocery = grocery.trim();
    this.apiService.updateGroceries({grocery: grocery, checked: checked, userId: this.apiService.readCookie("userId"), counter: 0})
  }

  submitForm(e) {
    var str = document.getElementById("mat-input-0").attributes['ng-reflect-model'].value;
    console.log(e);
    for (var i = 0; i < this.result.length; i++) {
      if (!this.result[i].grocery.includes(str)) {
        document.getElementById("mat-checkbox-"+i).style.display = 'none'
      } else {
        document.getElementById("mat-checkbox-"+i).style.display = 'block';
      }
    }
  }
}
