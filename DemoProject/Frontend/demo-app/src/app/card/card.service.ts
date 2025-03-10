import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, finalize } from 'rxjs';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:5290/api/cards';
  
  // Kartlar için BehaviorSubject
  private cardsSubject = new BehaviorSubject<Card[]>([]);
  public cards$ = this.cardsSubject.asObservable();

  constructor(private http: HttpClient) {
    // Başlangıçta kartları yükle
    this.refreshCards();
  }

  // Kartları yenile
  refreshCards(): void {
    console.log('Kartlar yenileniyor...');
    this.http.get<Card[]>(this.apiUrl).subscribe({
      next: cards => {
        console.log('Kartlar alındı:', cards);
        this.cardsSubject.next(cards);
      },
      error: error => {
        console.error('Kartlar alınırken hata oluştu:', error);
      }
    });
  }

  // Tüm kartları getir
  getCards(): Observable<Card[]> {
    return this.cards$;
  }

  // Belirli bir kartı getir
  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${id}`);
  }

  // Yeni kart oluştur
  createCard(card: Omit<Card, 'id' | 'createdDate'>): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card).pipe(
      tap(newCard => {
        console.log('Yeni kart oluşturuldu:', newCard);
      }),
      finalize(() => {
        // İşlem tamamlandığında kartları yenile
        this.refreshCards();
      })
    );
  }

  // Kartı güncelle
  updateCard(id: number, card: Omit<Card, 'id' | 'createdDate'>): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${id}`, card).pipe(
      tap(updatedCard => {
        console.log('Kart güncellendi:', updatedCard);
      }),
      finalize(() => {
        // İşlem tamamlandığında kartları yenile
        this.refreshCards();
      })
    );
  }

  // Kartı sil
  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log('Kart silindi, ID:', id);
      }),
      finalize(() => {
        // İşlem tamamlandığında kartları yenile
        this.refreshCards();
      })
    );
  }
} 