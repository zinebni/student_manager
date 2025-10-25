import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-bar-container" @searchAnimation>
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input
          [(ngModel)]="searchQuery"
          (input)="onSearchChange()"
          placeholder="Rechercher par nom ou email..."
          class="search-input"
        />
        <button
          class="btn-clear"
          (click)="clearSearch()"
          *ngIf="searchQuery"
          title="Effacer la recherche"
          @clearButtonAnimation
        >
          ✕
        </button>
      </div>
      <p class="search-hint" *ngIf="searchQuery">
        Résultats pour: <strong>{{ searchQuery }}</strong>
      </p>
    </div>
  `,
  styles: `
    .search-bar-container {
      margin-bottom: 24px;
      animation: slideDown 0.3s ease-out;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border: 2px solid #e0e6ed;
      border-radius: 12px;
      padding: 12px 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .search-bar:hover {
      border-color: #3498db;
      box-shadow: 0 4px 16px rgba(52, 152, 219, 0.15);
    }

    .search-bar:focus-within {
      border-color: #3498db;
      box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1), 0 4px 16px rgba(52, 152, 219, 0.15);
    }

    .search-icon {
      font-size: 1.2rem;
      color: #3498db;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 1rem;
      font-family: inherit;
      color: #2c3e50;
      outline: none;
      padding: 0;
    }

    .search-input::placeholder {
      color: #bdc3c7;
    }

    .btn-clear {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.2s ease-in-out;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
    }

    .btn-clear:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
    }

    .btn-clear:active {
      transform: scale(0.95);
    }

    .search-hint {
      margin-top: 8px;
      font-size: 0.85rem;
      color: #7f8c8d;
      padding: 0 16px;
      animation: fadeIn 0.3s ease-in-out;
    }

    .search-hint strong {
      color: #3498db;
      font-weight: 700;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .search-bar {
        padding: 10px 12px;
      }
      .search-icon {
        font-size: 1rem;
      }
    }
  `,
  animations: [
    trigger('searchAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('clearButtonAnimation', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.8 }),
        animate('0.2s ease-out', style({ opacity: 1, scale: 1 }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0, scale: 0.8 }))
      ])
    ])
  ]
})
export class SearchBar {
  searchQuery: string = '';
  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange(): void {
    console.log('🔍 SearchBarComponent: Recherche modifiée:', this.searchQuery);
    this.searchChanged.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchChanged.emit(this.searchQuery);
    console.log('🧹 SearchBarComponent: Recherche effacée.');
  }

}
