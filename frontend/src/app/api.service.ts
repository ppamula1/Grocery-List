import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'

@Injectable()
export class ApiService {
    groceries = []
    path = environment.path

    constructor(private http: HttpClient) {}
    result = ''
    postGroceries(grocery) {
        
        this.http.post(this.path + '/update', grocery).subscribe(res => {
            
            
            return res;

        })
        this.groceries.push(grocery.grocery)
        //return this.groceries
    }
    
    getGroceries(grocery, userId) {
        return this.http.get(this.path + '/groceries?grocery=' + grocery + '&userId=' + userId)
    }

    updateGroceries(grocery) {
        //console.log(grocery)
        this.http.post(this.path + '/update', grocery).subscribe(res => {
           //console.log(res);
            return res;

        })
        /*var app = angular.module('app', []);
        app.controller('ctrl', function($scope, $http) {
          $http.get("welcome.htm")
            .then(function(response) {
              $scope.groceries = response.data;
            });
        });*/
        //return this.http.get(this.path + '/groceries?grocery=' + g)
        //return this.http.get(this.path + '/update?grocery=' + g + '&checked='+ c)
    }

      // Create cookie
    createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
  
    // Read cookie
    readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }
  
    // Erase cookie
    eraseCookie(name) {
        //createCookie(name,"",-1);
    }
    
    randomString(length, chars) {
        var mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
    }
}