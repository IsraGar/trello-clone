import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../environments/environment.prod';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../models/board.model';
import { Card, UpdateCardDto } from '../models/cards.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private http = inject(HttpClient);
  apiUrl = environment.API_URL;

  constructor() { }

  update(id: Card['id'], changes: UpdateCardDto){
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, { context: checkToken() });
  }

}
