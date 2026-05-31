// import { HttpClient } from '@angular/common/http';
// import { Component, inject, OnInit, Signal, signal } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { lastValueFrom } from 'rxjs';
// import { Nav } from "../layout/nav/nav";
// import { AccountService } from '../core/services/account-service';
// import { User } from '../types/user';
// import { NgClass } from '@angular/common';


// @Component({
//   selector: 'app-root',
//   imports: [Nav, RouterOutlet, NgClass],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App implements OnInit {

//   private accountService = inject(AccountService);
  
  // private http = inject(HttpClient); // constructor(private http: HttpClient){}
  // protected readonly title = signal('Dating App');
  // protected members = signal<User[]>([]);
  // protected router = inject(Router);

  // oder dont matters of functions
  // ngOnInit():void{
  //   this.http.get('https:/localhost:5001/api/members').subscribe({
  //     next: response => this.members.set(response),
  //     error: error => console.log(error),
  //     complete: () => console.log('Http call is completed') // this is optional for both next/error call back
       
  //   })
  // }; 

  //  async ngOnInit() {
  //   this.members.set(await this.getMembers())
  //   this.setCurrentUser();
  // }

  // This code is moved to init service and called in app initializer provider in app config
  //  setCurrentUser() {
  //   const userString = localStorage.getItem('user');
  //   if (!userString) return;
  //   const user = JSON.parse(userString);
  //   this.accountService.currentUser.set(user);
  // }

//   async getMembers(){
//     try{
//       return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
//     }
//     catch(error){
//       console.log(error);
//       throw error;
//     }
//   }

// }


// This code after initService and above on is before initService

import { Component, inject } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from "@angular/common";
@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  protected router = inject(Router);
}