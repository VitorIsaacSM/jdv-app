import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo';

const API: string = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  ListFromServer(userName: string){
    return this.http
    .get<Photo[]>( API + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams()
        .append('page', page.toString());

    return this.http
        .get<Photo[]>(API + userName + '/photos', { params: params });
  }
  
}
