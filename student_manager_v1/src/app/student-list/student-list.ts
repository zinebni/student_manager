//ce composant est l'intermediaire entre le parent "student_manager" et le child "student_card"
//
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { StudentCardComponent } from '../student-card/student-card';

@Component({
  selector: 'app-student-list',
  imports: [NgFor, NgIf, StudentCardComponent],
  template: `
    <div class="list-panel">
      <h3>Liste des étudiants</h3>
      <div *ngIf="students?.length; else empty">
        <div class="grid">
          <app-student-card
            *ngFor="let s of students"
            [student]="s"
            [isSelected]="selectedStudentId === s.id"
            (selected)="studentSelected.emit($event)"
            (deleted)="studentDeleted.emit($event)"
          ></app-student-card>
        </div>
      </div>
      <ng-template #empty>
        <p>Aucun étudiant pour le moment.</p>
      </ng-template>
    </div>
  `,
  styles: `
    .list-panel { background:#f9fbfd; border:1px solid #eef3f8; border-radius:8px; padding:15px; }
    .grid { display:grid; grid-template-columns: 1fr; gap:10px; }
  `
})
export class StudentListComponent {
  @Input() students: any[] = []; //recuperation de la liste des etudiants depuis le parent "student_manager"
  @Input() selectedStudentId: number | null = null; //recuperation de l'id de l'etudiant selectionné depuis le parent "student_manager" et le passe au child "student_card" ([class.selected]="isSelected")
  @Output() studentSelected = new EventEmitter<any>();//ce vas emeter l'id de l'etudiant selectionné au student_manager grace a l'output de son enfant student_card
  @Output() studentDeleted = new EventEmitter<number>();//ce vas emeter l'id de l'etudiant supprimé au student_manager grace a l'output de son enfant student_card
}
