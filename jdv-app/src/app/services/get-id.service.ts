import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetIdService {

  private source = new BehaviorSubject('-1');
  currentId = this.source.asObservable();


  constructor(private http: HttpClient) { }

  //get an id from the server
  getId(){
    let session = this.TokenGenerator();
    return this.http.post('http://localhost:8080/jdv/api/geraId', { id: "-1", session : session });
  }

  changeId(id: string){
    this.source.next(id);
  }

  private TokenGenerator(){

    let session = window.localStorage.getItem('session');
    if(session){
      return session;
    }

    let myId = 0;
    for(let i = 0; i < 8; i++){
      myId += ( ( Math.random() * 100 ) % 10 ) * Math.pow(10, i);
    }
    window.localStorage.setItem('session', myId.toFixed(0));
    return myId.toFixed(0);
  }
}
