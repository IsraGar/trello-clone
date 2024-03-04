import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../environments/environment.prod';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private http = inject(HttpClient);
  apiUrl = environment.API_URL;

  constructor() { }

  getMeProfile(){
    return this.http.get<User>(`${this.apiUrl}/api/v1/me/profile`, { context: checkToken() });
  }

  getMeBoards(){
    return this.http.get<Board[]>(`${this.apiUrl}/api/v1/me/boards`, { context: checkToken() });
  }

}
