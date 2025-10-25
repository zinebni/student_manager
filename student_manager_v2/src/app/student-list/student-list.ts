//ce composant est l'intermediaire entre le parent "student_manager" et le child "student_card"
//
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentCard } from '../student-card/student-card';

@Component({
  selector: 'app-student-list',
  imports: [NgFor, NgIf, StudentCard],
  template: `
    <div class="list-panel" @listAnimation>
      <div class="list-header">
        <h3>📋 Liste des Étudiants</h3>
        <span class="count-badge">{{ students?.length || 0 }}</span>
      </div>
      <div *ngIf="students?.length; else empty" class="list-content">
        <div class="grid" @listItemsAnimation>
          <app-student-card
            *ngFor="let s of students; trackBy: trackByStudentId"
            [student]="s"
            [isSelected]="selectedStudentId === s.id"
            (selected)="studentSelected.emit($event)"
            (deleted)="studentDeleted.emit($event)"
          ></app-student-card>
        </div>
      </div>
      <ng-template #empty>
        <div class="empty-state">
          <p class="empty-icon">📚</p>
          <p class="empty-text">Aucun étudiant pour le moment.</p>
          <p class="empty-hint">Ajoutez un étudiant via le formulaire ci-dessus</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: `
    .list-panel {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border: 1px solid rgba(52, 152, 219, 0.15);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease-in-out;
    }

    .list-panel:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(52, 152, 219, 0.2);
    }

    .list-header h3 {
      color: #2c3e50;
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .count-badge {
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      color: #fff;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.9rem;
      box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
    }

    .list-content {
      animation: fadeIn 0.3s ease-in-out;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      background: rgba(52, 152, 219, 0.05);
      border-radius: 12px;
      border: 2px dashed rgba(52, 152, 219, 0.2);
      animation: fadeIn 0.4s ease-in-out;
    }

    .empty-icon {
      font-size: 3rem;
      margin: 0 0 10px 0;
    }

    .empty-text {
      color: #2c3e50;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .empty-hint {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin: 0;
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
      .list-panel {
        padding: 16px;
      }
      .list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }
  `,
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.4s 0.15s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listItemsAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          stagger(50, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class StudentList {
  @Input() students: any[] = []; //recuperation de la liste des etudiants depuis le parent "student_manager"
  @Input() selectedStudentId: number | null = null; //recuperation de l'id de l'etudiant selectionné depuis le parent "student_manager" et le passe au child "student_card" ([class.selected]="isSelected")
  @Output() studentSelected = new EventEmitter<any>();//ce vas emeter l'id de l'etudiant selectionné au student_manager grace a l'output de son enfant student_card
  @Output() studentDeleted = new EventEmitter<number>();//ce vas emeter l'id de l'etudiant supprimé au student_manager grace a l'output de son enfant student_card

  trackByStudentId(index: number, student: any): number {
    return student.id;
  }
}
