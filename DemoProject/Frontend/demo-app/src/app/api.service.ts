import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Card {
  id: number;
  title: string;
  description: string;
  createdDate: Date;
}

export interface CreateCardCommand {
  title: string;
  description: string;
}

export interface UpdateCardCommand {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5290/api';

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/cards`);
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/cards/${id}`);
  }

  createCard(card: CreateCardCommand): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/cards`, card);
  }

  updateCard(id: number, card: UpdateCardCommand): Observable<any> {
    return this.http.put(`${this.apiUrl}/cards/${id}`, card);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cards/${id}`);
  }
}
