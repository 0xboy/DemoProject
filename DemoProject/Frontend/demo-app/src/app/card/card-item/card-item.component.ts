import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card.model';
import { FormsModule } from '@angular/forms';
import { CardService } from '../card.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnDestroy {
  @Input() card!: Card;
  @Output() onDelete = new EventEmitter<number>();
  
  isEditing: boolean = false;
  editedCard: { title: string, description: string } = { title: '', description: '' };
  isLoading: boolean = false;
  errorMessage: string = '';
  
  private subscription = new Subscription();

  constructor(private cardService: CardService) {}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  startEdit(): void {
    this.isEditing = true;
    this.editedCard = {
      title: this.card.title,
      description: this.card.description
    };
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEdit(): void {
    if (!this.editedCard.title.trim()) {
      return;
    }

    this.isLoading = true;
    this.subscription.add(
      this.cardService.updateCard(this.card.id, this.editedCard).subscribe({
        next: (updatedCard) => {
          // Servis zaten BehaviorSubject'i güncelleyecek
          this.isEditing = false;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Kart güncellenirken bir hata oluştu.';
          this.isLoading = false;
          console.error('Kart güncellenirken hata:', error);
        }
      })
    );
  }

  deleteCard(): void {
    this.onDelete.emit(this.card.id);
  }

  formatDate(date: Date | string): string {
    if (!date) {
      return 'Tarih yok';
    }
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Geçersiz tarih kontrolü
      if (isNaN(dateObj.getTime())) {
        return 'Geçersiz tarih';
      }
      
      return dateObj.toLocaleDateString('tr-TR');
    } catch (error) {
      console.error('Tarih formatlanırken hata:', error);
      return 'Geçersiz tarih';
    }
  }
} 