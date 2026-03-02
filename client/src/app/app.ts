import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  private http = inject(HttpClient); // constructor(private http: HttpClient){}
  protected readonly title = signal('Dating App');
  protected members = signal<any>([]);

  // oder dont matters of functions
  // ngOnInit():void{
  //   this.http.get('https:/localhost:5001/api/members').subscribe({
  //     next: response => this.members.set(response),
  //     error: error => console.log(error),
  //     complete: () => console.log('Http call is completed') // this is optional for both next/error call back
       
  //   })
  // }; 

  async ngOnInit() {
    this.members.set( await this.getMembers());
  };

  async getMembers(){
    try{
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

}
