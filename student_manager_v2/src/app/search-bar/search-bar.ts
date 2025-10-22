import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-bar">
      <input 
        [(ngModel)]="searchQuery" 
        (input)="onSearchChange()" 
        placeholder="Rechercher par nom ou email...">
      <button (click)="clearSearch()" *ngIf="searchQuery">X</button>
    </div>
  `,
  styles: `
    .search-bar {
      display: flex;
      margin-bottom: 20px;
      gap: 10px;
    }
    .search-bar input {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1em;
    }
    .search-bar button {
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 15px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .search-bar button:hover { background-color: #c0392b; }
  `
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
