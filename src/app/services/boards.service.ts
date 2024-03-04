import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private http = inject(HttpClient);
  apiUrl = environment.API_URL;

  constructor() { }

  getBoard(id: Board['id']){
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, { context: checkToken() })
  }

}
