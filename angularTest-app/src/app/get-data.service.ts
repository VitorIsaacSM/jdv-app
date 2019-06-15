import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ObjetoJson } from './objetoJson';
import { Observable } from 'rxjs';


let url = 'https://node-pessoa-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  data: ObjetoJson[];

  constructor(private http: HttpClient) { }
  getDataFromServer(){
    //return this.http.get<Object[]>('http://localhost:3000/getData');
    return this.http.get<ObjetoJson[]>(url + '/getData');
  }

  addUserOnServer(objeto :ObjetoJson):Observable<ObjetoJson>{
    return this.http.post<ObjetoJson>(url + '/postData', objeto);
  }

  resetDataFromServer(){
    return this.http.post<any>(url + '/resetData', []);
  }
}


