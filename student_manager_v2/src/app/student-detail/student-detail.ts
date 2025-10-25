import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-detail',
  imports: [NgIf, FormsModule],
  template: `
    <div class="detail-panel" *ngIf="student" @detailAnimation>
      <div class="detail-header">
        <h3>👁️ Détails de l'Étudiant</h3>
        <span class="edit-badge" [class.edit-mode]="editMode">
          {{ editMode ? '✏️ Mode édition' : '📖 Lecture seule' }}
        </span>
      </div>

      <div class="detail-content" *ngIf="!editMode" @fadeInOut>
        <div class="detail-row">
          <span class="detail-label">Nom</span>
          <span class="detail-value">{{ student.name }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value email-value">{{ student.email }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Promotion</span>
          <span class="detail-value promo-badge">{{ student.promo }}</span>
        </div>
        <button class="btn-edit" (click)="toggleEdit()">✏️ Modifier</button>
      </div>

      <div class="detail-content edit-form" *ngIf="editMode" @fadeInOut>
        <div class="form-group">
          <label for="edit-name">Nom</label>
          <input
            id="edit-name"
            [(ngModel)]="student.name"
            placeholder="Entrez le nom"
          />
        </div>
        <div class="form-group">
          <label for="edit-email">Email</label>
          <input
            id="edit-email"
            [(ngModel)]="student.email"
            type="email"
            placeholder="Entrez l'email"
          />
        </div>
        <div class="form-group">
          <label for="edit-promo">Promotion</label>
          <select id="edit-promo" [(ngModel)]="student.promo">
            <option value="3A">3ème année</option>
            <option value="4A">4ème année</option>
          </select>
        </div>
        <button class="btn-save" (click)="toggleEdit()">💾 Sauvegarder</button>
      </div>
    </div>
  `,
  styles: `
    .detail-panel {
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0.02) 100%);
      border: 2px solid rgba(52, 152, 219, 0.2);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 15px rgba(52, 152, 219, 0.1);
      transition: all 0.3s ease-in-out;
    }

    .detail-panel:hover {
      box-shadow: 0 8px 25px rgba(52, 152, 219, 0.15);
      border-color: rgba(52, 152, 219, 0.3);
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(52, 152, 219, 0.2);
    }

    .detail-header h3 {
      color: #2980b9;
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .edit-badge {
      background: rgba(52, 152, 219, 0.1);
      color: #2980b9;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      transition: all 0.3s ease-in-out;
    }

    .edit-badge.edit-mode {
      background: rgba(230, 126, 34, 0.1);
      color: #e67e22;
    }

    .detail-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: all 0.2s ease-in-out;
    }

    .detail-row:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: translateX(4px);
    }

    .detail-label {
      font-weight: 700;
      color: #2c3e50;
      font-size: 0.95rem;
    }

    .detail-value {
      color: #7f8c8d;
      font-size: 0.95rem;
    }

    .email-value {
      word-break: break-all;
    }

    .promo-badge {
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0.1) 100%);
      color: #2980b9;
      padding: 4px 12px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.9rem;
    }

    .edit-form {
      gap: 14px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      color: #2c3e50;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .form-group input,
    .form-group select {
      padding: 10px 12px;
      border: 2px solid #e0e6ed;
      border-radius: 6px;
      font-size: 0.95rem;
      font-family: inherit;
      transition: all 0.3s ease-in-out;
      background: #fff;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .form-group input:hover,
    .form-group select:hover {
      border-color: #3498db;
    }

    .btn-edit, .btn-save {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.95rem;
      transition: all 0.3s ease-in-out;
      margin-top: 8px;
    }

    .btn-edit {
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      color: #fff;
      box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    }

    .btn-edit:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    }

    .btn-save {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: #fff;
      box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
    }

    .btn-save:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
    }

    .btn-edit:active, .btn-save:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .detail-panel {
        padding: 16px;
      }
      .detail-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
    }
  `,
  animations: [
    trigger('detailAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class StudentDetail implements OnChanges {
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
