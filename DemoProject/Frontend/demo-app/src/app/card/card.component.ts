import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Card, CreateCardCommand, UpdateCardCommand } from '../api.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  cards: Card[] = [];
  newCard: CreateCardCommand = {
    title: '',
    description: ''
  };
  editingCard: UpdateCardCommand = {
    title: '',
    description: ''
  };
  editingCardId: number | null = null;
  loading = false;
  error = '';
  successMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.loading = true;
    this.apiService.getAllCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Kartlar yüklenirken bir hata oluştu.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  createCard(): void {
    if (!this.newCard.title || !this.newCard.description) {
      this.error = 'Başlık ve açıklama alanları zorunludur.';
      return;
    }

    this.loading = true;
    this.apiService.createCard(this.newCard).subscribe({
      next: () => {
        this.loadCards();
        this.newCard = { title: '', description: '' };
        this.loading = false;
        this.successMessage = 'Kart başarıyla oluşturuldu.';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.error = 'Kart oluşturulurken bir hata oluştu.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  startEditing(card: Card): void {
    this.editingCardId = card.id;
    this.editingCard = {
      title: card.title,
      description: card.description
    };
  }

  cancelEditing(): void {
    this.editingCardId = null;
  }

  updateCard(): void {
    if (!this.editingCardId) return;
    
    if (!this.editingCard.title || !this.editingCard.description) {
      this.error = 'Başlık ve açıklama alanları zorunludur.';
      return;
    }

    this.loading = true;
    this.apiService.updateCard(this.editingCardId, this.editingCard).subscribe({
      next: () => {
        this.loadCards();
        this.editingCardId = null;
        this.loading = false;
        this.successMessage = 'Kart başarıyla güncellendi.';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.error = 'Kart güncellenirken bir hata oluştu.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteCard(id: number): void {
    if (confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      this.loading = true;
      this.apiService.deleteCard(id).subscribe({
        next: () => {
          this.loadCards();
          this.loading = false;
          this.successMessage = 'Kart başarıyla silindi.';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.error = 'Kart silinirken bir hata oluştu.';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
}
