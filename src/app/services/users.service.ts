import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { TokenService } from './token.service';
import { User } from '../models/user.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  apiUrl = environment.API_URL;

  constructor() { }

  getUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, { context: checkToken() });
  }

}
