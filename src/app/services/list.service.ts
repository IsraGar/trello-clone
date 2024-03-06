import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { CreateListDto, List } from '../models/list.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  constructor() { }

  create(dto: CreateListDto){
    return this.http.post<List>(`${this.apiUrl}/api/v1/lists`, dto, { context: checkToken() })
  }
}
