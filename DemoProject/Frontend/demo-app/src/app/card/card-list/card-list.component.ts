import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { CardItemComponent } from '../card-item/card-item.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardItemComponent, FormsModule],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  
  // Yeni kart ekleme için
  newCard = {
    title: '',
    description: ''
  };
  isAddingCard: boolean = false;
  
  // Subscription'ları takip etmek için
  private subscription = new Subscription();

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  ngOnDestroy(): void {
    // Component yok edildiğinde subscription'ları temizle
    this.subscription.unsubscribe();
  }

  loadCards(): void {
    this.isLoading = true;
    
    // cards$ observable'ına abone ol
    this.subscription.add(
      this.cardService.cards$.subscribe({
        next: (cards) => {
          // Kartları dönüştürürken hata kontrolü yap
          this.cards = cards.map(card => {
            try {
              return {
                ...card,
                // Tarih alanını güvenli bir şekilde dönüştür
                createdDate: card.createdDate ? new Date(card.createdDate) : new Date()
              };
            } catch (error) {
              console.error('Kart dönüştürülürken hata:', error, card);
              return card; // Hata durumunda orijinal kartı döndür
            }
          });
          this.isLoading = false;
          console.log('Kartlar yüklendi:', this.cards);
        },
        error: (error) => {
          this.errorMessage = 'Kartlar yüklenirken bir hata oluştu.';
          this.isLoading = false;
          console.error('Kartlar yüklenirken hata:', error);
        }
      })
    );
    
    // Kartları yenile
    this.cardService.refreshCards();
  }

  toggleAddCard(): void {
    this.isAddingCard = !this.isAddingCard;
    if (this.isAddingCard) {
      this.newCard = {
        title: '',
        description: ''
      };
    }
  }

  addCard(): void {
    if (!this.newCard.title.trim()) {
      return;
    }

    this.isLoading = true;
    console.log('Kart ekleniyor:', this.newCard);
    
    this.subscription.add(
      this.cardService.createCard(this.newCard).subscribe({
        next: (newCard) => {
          console.log('Kart başarıyla eklendi:', newCard);
          this.isLoading = false;
          this.isAddingCard = false;
          this.newCard = {
            title: '',
            description: ''
          };
          
          // Kartları yenile
          this.cardService.refreshCards();
        },
        error: (error) => {
          this.errorMessage = 'Kart eklenirken bir hata oluştu.';
          this.isLoading = false;
          console.error('Kart eklenirken hata:', error);
        }
      })
    );
  }

  deleteCard(id: number): void {
    if (confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      this.isLoading = true;
      console.log('Kart siliniyor, ID:', id);
      
      this.subscription.add(
        this.cardService.deleteCard(id).subscribe({
          next: () => {
            console.log('Kart başarıyla silindi, ID:', id);
            this.isLoading = false;
            
            // Kartları yenile
            this.cardService.refreshCards();
          },
          error: (error) => {
            this.errorMessage = 'Kart silinirken bir hata oluştu.';
            this.isLoading = false;
            console.error('Kart silinirken hata:', error);
          }
        })
      );
    }
  }
} 