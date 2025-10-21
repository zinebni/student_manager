// est un component qui affiche une ligne d'étudiant avec des actions pour sélectionner ou supprimer l'étudiant.
//l'etudiant est passé en entrée via la propriété @Input() student passer depuis le parent "student-list"
//Le component émet des événements via les propriétés @Output() selected et deleted lorsque l'utilisateur clique sur les boutons correspondants.
//c'est evenement sont capturés par le parent "student-list" 
//

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-card',
  imports: [],
  template: `
    <div class="card" [class.selected]="isSelected">
      <div class="card-main">
        <div>
          <div class="name">{{ student.name }}</div>
          <div class="meta">{{ student.email }} · {{ student.promo }}</div>
        </div>
        <div class="actions">
          <button (click)="onSelect()">Sélectionner</button>
          <button class="danger" (click)="onDelete()">Supprimer</button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .card { border:1px solid #eee; border-radius:8px; padding:10px; background:#fff; }
    .card.selected { border-color:#3498db; box-shadow: 0 0 0 2px rgba(52,152,219,.15); }
    .card-main { display:flex; justify-content:space-between; align-items:center; gap:10px; }
    .name { font-weight:600; color:#2c3e50; }
    .meta { color:#777; font-size:.9em; }
    .actions button { margin-left:6px; padding:6px 10px; border:none; border-radius:4px; cursor:pointer; }
    .actions button:hover { opacity:.9; }
    .actions .danger { background:#e74c3c; color:#fff; }
    .actions button:not(.danger) { background:#3498db; color:#fff; }
  `
})
export class StudentCardComponent {
  @Input() student: any;
  @Input() isSelected: boolean = false;
  @Output() selected = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<number>();

  onSelect(): void { this.selected.emit(this.student); }
  onDelete(): void { this.deleted.emit(this.student?.id); }
}
