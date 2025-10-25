// components/student-manager/student-manager.component.ts
// ==========================
// COMPOSANT MANAGER - Orchestrateur principal avec Service
// ==========================

// Importations Angular et services
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Student, StudentService } from '../../services/student.service'; //model et service des étudiants

//imports des composants enfants
import { SearchBar } from '../search-bar/search-bar';
import { Stats } from '../stats/stats';
import { StudentDetail } from '../student-detail/student-detail';
import { StudentForm } from '../student-form/student-form';
import { StudentList } from '../student-list/student-list';


@Component({
  selector: 'app-student-manager',
  standalone: true,
  imports: [
    CommonModule,
    StudentList,
    StudentForm,
    StudentDetail,
    SearchBar,
    Stats
  ],
  template: `
    <div class="student-manager-container" @containerAnimation>
      <div class="manager-header">
        
      </div>

      <!-- Barre de recherche -->
      <app-search-bar (searchChanged)="onSearchChanged($event)"></app-search-bar>

      <div class="main-content">
        <div class="left-panel">
          <!-- Formulaire d'ajout -->
          <app-student-form (studentAdded)="onStudentAdded($event)"></app-student-form>

          <!-- Liste des étudiants -->
          <app-student-list
            [students]="filteredStudents()"
            [selectedStudentId]="selectedStudentId()"
            (studentSelected)="onStudentSelected($event)"
            (studentDeleted)="onStudentDeleted($event)">
          </app-student-list>
        </div>

        <div class="right-panel">
          <!-- Détails de l'étudiant sélectionné -->
          <app-student-detail [student]="selectedStudent()"></app-student-detail>

          <!-- Statistiques -->
          <app-stats [stats]="stats()"></app-stats>
        </div>
      </div>

      <p class="counter">
        📊 Total affichés : <span class="count-highlight">{{ filteredStudents().length }}</span> / <span class="count-total">{{ students().length }}</span>
      </p>
    </div>
  `,
  styles: [`
    .student-manager-container {
      padding: 30px;
      border: 1px solid rgba(52, 152, 219, 0.2);
      border-radius: 16px;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
    }

    .student-manager-container:hover {
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
    }

    .manager-header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid rgba(52, 152, 219, 0.3);
    }

    

    .main-content {
      display: flex;
      gap: 25px;
      margin-top: 25px;
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
      font-weight: 600;
      color: #2c3e50;
      margin-top: 20px;
      padding-top: 15px;
      border-top: 2px solid rgba(52, 152, 219, 0.2);
      font-size: 0.95rem;
      transition: all 0.3s ease-in-out;
    }

    .count-highlight {
      color: #3498db;
      font-weight: 700;
      font-size: 1.1rem;
    }

    .count-total {
      color: #7f8c8d;
      font-weight: 600;
    }

    @media (max-width: 1024px) {
      .main-content {
        flex-direction: column;
        gap: 20px;
      }
      .left-panel, .right-panel {
        flex: 1;
      }
    }
  `],
  animations: [
    trigger('containerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.5s 0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class StudentManagerComponent {
  
  // ==========================
  // INJECTION DU SERVICE
  // ==========================
  private studentService = inject(StudentService);

  // ==========================
  // ÉTAT LOCAL (UI uniquement)
  // ==========================
  searchQuery = signal<string>(''); //search query recuperer de l'enfant search_bar
  selectedStudentId = signal<number | null>(null); //id de l'étudiant sélectionné pour le détail

  // ==========================
  // DONNÉES DU SERVICE
  // ==========================
  students = this.studentService.students;
  stats = this.studentService.stats;

  // ==========================
  // COMPUTED SIGNALS
  // ==========================
  
  /**Étudiants filtrés selon la recherche: envoiyée à l'enfant student_list
   * initialiser un computed pour les étudiants filtrés en fonction de la requête de recherche
   * il est recalculé automatiquement lorsque searchQuery ou students changent
   */
  filteredStudents = computed(() => {
    const query = this.searchQuery();//recupere la valeur du signal searchQuery
    if (!query.trim()) {
      return this.students();
    }
    return this.studentService.searchStudents(query);//utilise la methode de recherche du service
  });

  /**
   * Étudiant sélectionné envoié a l'enfant student_detail valeur est recuperée depuis selectedStudentId envoyer par l'enfant student_list
   */
  selectedStudent = computed(() => {
    const id = this.selectedStudentId();
    if (id === null) return null;
    return this.studentService.getStudentById(id) || null;
  });

  // ==========================
  // GESTIONNAIRES D'ÉVÉNEMENTS
  // ==========================

  /**
   * Recherche modifiée : cette recupere le searchQuery émise par le composant enfant search_bar
   * assigner la nouvelle requête de recherche au signal searchQuery
   * la liste des étudiants filtrés se mettra à jour automatiquement via le computed filteredStudents
   */
  onSearchChanged(query: string): void {
    console.log('🔎 Manager: Recherche mise à jour:', query);
    this.searchQuery.set(query);
  }

  /**
   * Étudiant ajouté depuis le formulaire
   * cette methode recupere le studentData (sans id) du composant enfant student_form
   */
  onStudentAdded(studentData: Omit<Student, 'id'>): void {
    const newStudent = this.studentService.addStudent(studentData);
    console.log('📥 Manager: Nouvel étudiant ajouté:', newStudent);
  }

  /**
   * Étudiant sélectionné depuis la liste recuperer depuis l'enfant student_list
   */
  onStudentSelected(student: Student): void {
    console.log('👂 Manager: Étudiant sélectionné:', student.name);
    this.selectedStudentId.set(student.id);
  }

  /**
   * Étudiant supprimé depuis la liste
   */
  onStudentDeleted(id: number): void {
    console.log('👂 Manager: Demande de suppression pour ID:', id);
    
    const success = this.studentService.deleteStudent(id);
    
    if (success) {
      // Désélectionner si c'était l'étudiant sélectionné
      if (this.selectedStudentId() === id) {
        this.selectedStudentId.set(null);
      }
      console.log(`✅ Manager: Étudiant ${id} supprimé. Reste ${this.students().length} étudiants.`);
    }
  }

  /**
   * Étudiant mis à jour depuis le détail
   */
  onStudentUpdated(updates: { id: number; data: Partial<Omit<Student, 'id'>> }): void {
    console.log('✏️ Manager: Mise à jour de l\'étudiant:', updates);
    this.studentService.updateStudent(updates.id, updates.data);
  }
}