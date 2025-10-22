//tous les service qui etant gerer par component student_manager sont regroupé ici
//@injectable pour pouvoir l'injecter dans un component ou un autre service (providedIn: 'root' permet de le rendre singleton dans toute l'application)

import { Injectable, signal, computed } from '@angular/core';
 

//1 creer un model des données student pour typer les données
export interface Student {
  id: number;
  name: string;
  email: string;
  promo: '3A' | '4A';
}
//2 creer le service student par cmd ng generate service services/student
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  // ==========================
  // notre base de données - 
  // ÉTAT PRIVÉ (Signal) veux dire modifiable uniquement à l'intérieur du service
  // ==========================
  private studentsSignal = signal<Student[]>([
    { id: 1, name: 'Ahmed Bennani', promo: '3A', email: 'ahmed@edu.ma' },
    { id: 2, name: 'Fatima Alaoui', promo: '3A', email: 'fatima@edu.ma' },
    { id: 3, name: 'Youssef Idrissi', promo: '4A', email: 'youssef@edu.ma' },
    { id: 4, name: 'Sara El Fassi', promo: '3A', email: 'sara@edu.ma' },
    { id: 5, name: 'Omar Ziani', promo: '4A', email: 'omar@edu.ma' }
  ]);

  // Signal en lecture seule
  readonly students = this.studentsSignal.asReadonly();

  // Compteur pour les IDs
  private nextId = 6;

  // ==========================
  // COMPUTED SIGNALS - Statistiques
  // computed permet de créer des valeurs dérivées basées sur d'autres signaux (dans ce cas studentsSignal)
  // ==========================
  
  readonly totalStudents = computed(() => this.studentsSignal().length);
  
  readonly promo3ACount = computed(() => 
    this.studentsSignal().filter(s => s.promo === '3A').length
  );
  
  readonly promo4ACount = computed(() => 
    this.studentsSignal().filter(s => s.promo === '4A').length
  );

  readonly stats = computed(() => ({
    total: this.totalStudents(),
    promo3A: this.promo3ACount(),
    promo4A: this.promo4ACount()
  }));

  // ==========================
  // MÉTHODES CRUD
  // ==========================

  /**
   * Ajoute un nouvel étudiant
   */
  addStudent(student: Omit<Student, 'id'>): Student {
    const newStudent: Student = {
      ...student,
      id: this.nextId++
    };
    
    this.studentsSignal.update(students => [...students, newStudent]);
    console.log('✅ Service: Étudiant ajouté:', newStudent );
    return newStudent;
  }

  /**
   * Met à jour un étudiant
   */
  updateStudent(id: number, updates: Partial<Omit<Student, 'id'>>): boolean {
    const index = this.studentsSignal().findIndex(s => s.id === id);
    
    if (index === -1) {
      console.warn(`⚠️ Service: Étudiant ID ${id} introuvable`);
      return false;
    }

    this.studentsSignal.update(students => {
      const updated = [...students];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });

    console.log(`✏️ Service: Étudiant ID ${id} mis à jour`);
    return true;
  }

  /**
   * Supprime un étudiant
   */
  deleteStudent(id: number): boolean {
    const initialLength = this.studentsSignal().length;
    
    this.studentsSignal.update(students => 
      students.filter(s => s.id !== id)
    );

    const deleted = this.studentsSignal().length < initialLength;
    
    if (deleted) {
      console.log(`Service: Étudiant ID ${id} supprimé`);
    } else {
      console.warn(`Service: Étudiant ID ${id} introuvable`);
    }

    return deleted;
  }

  /**
   * Récupère un étudiant par ID
   */
  getStudentById(id: number): Student | undefined {
    return this.studentsSignal().find(s => s.id === id);
  }

  /**
   * Recherche des étudiants
   */
  searchStudents(query: string): Student[] {
    if (!query.trim()) {
      return this.studentsSignal();
    }

    const lowerQuery = query.toLowerCase();
    return this.studentsSignal().filter(student =>
      student.name.toLowerCase().includes(lowerQuery) ||
      student.email.toLowerCase().includes(lowerQuery)
    );
  }

  
}