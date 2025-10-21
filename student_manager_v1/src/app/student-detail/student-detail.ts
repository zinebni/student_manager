import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-detail',
  imports: [NgIf, FormsModule],
  template: `
    <div class="detail-panel" *ngIf="student">
      <h3>Détails de l'étudiant</h3>
      <div *ngIf="!editMode">
        <p><strong>Nom :</strong> {{ student.name }}</p>
        <p><strong>Email :</strong> {{ student.email }}</p>
        <p><strong>Promotion :</strong> {{ student.promo }}</p>
        <button (click)="toggleEdit()">Modifier</button>
      </div>
      <div *ngIf="editMode">
        <p>Nom : <input [(ngModel)]="student.name"></p>
        <p>Email : <input [(ngModel)]="student.email"></p>
        <p>Promotion : 
          <select [(ngModel)]="student.promo">
            <option value="3A">3ème année</option>
            <option value="4A">4ème année</option>
          </select>
        </p>
        <button (click)="toggleEdit()">Sauvegarder</button>
      </div>
    </div>
  `,
  styles: `
    .detail-panel {
      background-color: #f0f8ff;
      border: 1px solid #a7d9ff;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .detail-panel h3 { color: #2980b9; margin-top: 0; border-bottom: 1px solid #a7d9ff; padding-bottom: 10px; margin-bottom: 15px; }
    .detail-panel p { margin-bottom: 10px; }
    .detail-panel input, .detail-panel select {
      width: calc(100% - 22px);
      padding: 8px;
      margin-left: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .detail-panel button {
      background-color: #3498db;
      color: white;
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9em;
      margin-top: 10px;
      transition: background-color 0.3s ease;
    }
    .detail-panel button:hover { background-color: #2980b9; }
  `
})
export class StudentDetailComponent implements OnChanges {
  @Input() student: any | null = null;
  editMode: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      console.log('🔄 StudentDetailComponent: Nouvel étudiant affiché ou mis à jour:', this.student.name);
      this.editMode = false;
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    console.log(`✏️ Mode édition pour ${this.student?.name}: ${this.editMode ? 'activé' : 'désactivé'}.`);
  }
}
