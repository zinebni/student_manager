import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { StudentFormComponent } from '../student-form/student-form';
import { StudentListComponent } from '../student-list/student-list';
import { StudentDetailComponent } from '../student-detail/student-detail';
import { SearchBarComponent } from '../search-bar/search-bar';
import { StatsComponent } from '../stats/stats';

@Component({
  selector: 'app-student-manager',
  imports: [
    NgIf,
    StudentFormComponent,
    StudentListComponent,
    StudentDetailComponent,
    SearchBarComponent,
    StatsComponent
  ],
  template: `
    <div class="student-manager-container">
      <h2>Système de Gestion des Étudiants</h2>
      
      <app-search-bar (searchChanged)="onSearchChanged($event)"></app-search-bar>

      <div class="main-content">
        <div class="left-panel">
          <app-student-form (studentAdded)="onStudentAdded($event)"></app-student-form>
          
          <app-student-list 
            [students]="filteredStudents"
            [selectedStudentId]="selectedStudentId"
            (studentSelected)="onStudentSelected($event)"
            (studentDeleted)="onStudentDeleted($event)">
          </app-student-list>
        </div>

        <div class="right-panel">
          <app-student-detail [student]="selectedStudent"></app-student-detail>
          <app-stats [stats]="studentStats"></app-stats>
        </div>
      </div>
      
      <p class="counter">Total étudiants affichés : {{ filteredStudents.length }} / {{ students.length }}</p>
    </div>
  `,
  styles: `
    .student-manager-container {
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 20px; text-align: center; }
    .main-content {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    .left-panel {
      flex: 2;
    }
    .right-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .counter {
      text-align: right;
      font-weight: bold;
      color: #555;
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid #eee;
    }
  `
})
export class StudentManagerComponent implements OnInit, OnDestroy {
  students: any[] = [];
  selectedStudent: any | null = null;
  selectedStudentId: number | null = null;
  searchQuery: string = '';

  ngOnInit(): void {
    console.log('🚀 StudentManagerComponent initialisé.');
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.students = [
      { id: 1, name: 'Ahmed Bennani', promo: '3A', email: 'ahmed@edu.ma' },
      { id: 2, name: 'Fatima Alaoui', promo: '3A', email: 'fatima@edu.ma' },
      { id: 3, name: 'Youssef Idrissi', promo: '4A', email: 'youssef@edu.ma' },
      { id: 4, name: 'Sara El Fassi', promo: '3A', email: 'sara@edu.ma' },
      { id: 5, name: 'Omar Ziani', promo: '4A', email: 'omar@edu.ma' }
    ];
    console.log(`✅ ${this.students.length} étudiants chargés initialement.`);
  }

  onStudentAdded(student: any): void {
    this.students.push(student);
    console.log('📥 StudentManagerComponent: Nouvel étudiant reçu et ajouté:', student);
  }

  onStudentSelected(student: any): void {
    console.log('👂 StudentManagerComponent: Étudiant sélectionné:', student.name);
    this.selectedStudent = student;
    this.selectedStudentId = student.id;
  }

  onStudentDeleted(id: number): void {
    console.log('👂 StudentManagerComponent: Demande de suppression pour l\'ID:', id);
    this.students = this.students.filter(s => s.id !== id);
    if (this.selectedStudent?.id === id) {
      this.selectedStudent = null;
      this.selectedStudentId = null;
    }
    console.log(`✅ Étudiant avec l'ID ${id} supprimé. Reste ${this.students.length} étudiants.`);
  }

  onSearchChanged(query: string): void {
    console.log('🔎 StudentManagerComponent: Recherche mise à jour:', query);
    this.searchQuery = query;
  }

  get filteredStudents(): any[] {
    if (!this.searchQuery) {
      return this.students;
    }
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    return this.students.filter(s => 
      s.name.toLowerCase().includes(lowerCaseQuery) ||
      s.email.toLowerCase().includes(lowerCaseQuery)
    );
  }

  get studentStats(): any {
    return {
      total: this.students.length,
      promo3A: this.students.filter(s => s.promo === '3A').length,
      promo4A: this.students.filter(s => s.promo === '4A').length
    };
  }

  ngOnDestroy(): void {
    console.log('💾 StudentManagerComponent détruit - Sauvegarde des modifications avant fermeture...');
  }
}
