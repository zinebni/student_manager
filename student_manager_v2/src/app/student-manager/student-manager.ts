// components/student-manager/student-manager.component.ts
// ==========================
// COMPOSANT MANAGER - Orchestrateur principal avec Service
// ==========================

// Importations Angular et services
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core'; 
import { Student, StudentService } from '../../services/student.service'; //model et service des étudiants

//imports des composants enfants
import { SearchBar } from '../search-bar/search-bar';
import { Stats } from '../stats/stats';
import { StudentList } from '../student-list/student-list';
import { StudentForm } from '../student-form/student-form';
import { StudentDetail } from '../student-detail/student-detail';


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
    <div class="student-manager-container">
      <h2>Système de Gestion des Étudiants</h2>
      
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
        Total étudiants affichés : {{ filteredStudents().length }} / {{ students().length }}
      </p>
    </div>
  `,
  styles: [`
    .student-manager-container {
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    h2 { 
      color: #2c3e50; 
      border-bottom: 2px solid #3498db; 
      padding-bottom: 10px; 
      margin-bottom: 20px; 
      text-align: center; 
    }
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
  `]
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