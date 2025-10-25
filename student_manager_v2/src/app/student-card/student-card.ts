// est un component qui affiche une ligne d'étudiant avec des actions pour sélectionner ou supprimer l'étudiant.
//l'etudiant est passé en entrée via la propriété @Input() student passer depuis le parent "student-list"
//Le component émet des événements via les propriétés @Output() selected et deleted lorsque l'utilisateur clique sur les boutons correspondants.
//c'est evenement sont capturés par le parent "student-list" 
//

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-card',
  imports: [],
  template: `
    <div class="card" [class.selected]="isSelected" @cardAnimation>
      <div class="card-content">
        <div class="student-info">
          <div class="name">👤 {{ student.name }}</div>
          <div class="meta">
            <span class="email">{{ student.email }}</span>
            <span class="separator">·</span>
            <span class="promo">{{ student.promo }}</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn-select" (click)="onSelect()" title="Sélectionner cet étudiant">
            Sélectionner
          </button>
          <button class="btn-delete" (click)="onDelete()" title="Supprimer cet étudiant">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .card {
      border: 1px solid #e0e6ed;
      border-radius: 12px;
      padding: 16px;
      background: #fff;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }

    .card:hover::before {
      left: 100%;
    }

    .card:hover {
      border-color: #3498db;
      box-shadow: 0 8px 24px rgba(52, 152, 219, 0.15);
      transform: translateY(-4px);
    }

    .card.selected {
      border-color: #3498db;
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(46, 204, 113, 0.05) 100%);
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2), 0 8px 24px rgba(52, 152, 219, 0.15);
    }

    .card-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      position: relative;
      z-index: 1;
    }

    .student-info {
      flex: 1;
      min-width: 0;
    }

    .name {
      font-weight: 700;
      color: #2c3e50;
      font-size: 1rem;
      margin-bottom: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      color: #7f8c8d;
      font-size: 0.85rem;
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .email {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .separator {
      color: #bdc3c7;
    }

    .promo {
      background: rgba(52, 152, 219, 0.1);
      color: #3498db;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.8rem;
    }

    .actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .actions button {
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.2s ease-in-out;
      white-space: nowrap;
    }

    .btn-select {
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      color: #fff;
    }

    .btn-select:hover {
      box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
      transform: translateY(-2px);
    }

    .btn-select:active {
      transform: translateY(0);
    }

    .btn-delete {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: #fff;
    }

    .btn-delete:hover {
      box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
      transform: translateY(-2px);
    }

    .btn-delete:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .card-content {
        flex-direction: column;
        align-items: flex-start;
      }
      .actions {
        width: 100%;
      }
      .actions button {
        flex: 1;
      }
    }
  `,
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class StudentCard {
  @Input() student: any;
  @Input() isSelected: boolean = false;
  @Output() selected = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<number>();

  onSelect(): void { this.selected.emit(this.student); }
  onDelete(): void { this.deleted.emit(this.student?.id); }
}
