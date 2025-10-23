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
//@Injectable decorator pour marquer la classe comme un service injectable
@Injectable({
  providedIn: 'root' //on peut specifier le scope du service (ici le service est disponible dans toute l'application)
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

  // Signal en lecture seule pour exposer les étudiants aux components : c'est une bonne pratique pour éviter les modifications directes de l'état depuis l'extérieur du service
  //cette propriété permet aux components d'accéder à la liste des étudiants sans pouvoir la modifier directement
  // c est elle qui sera utilisée dans les methodes CRUD 
  readonly students = this.studentsSignal.asReadonly();

  // Compteur pour les IDs
  private nextId = 6;

// ================================
// COMPUTED SIGNALS - Statistiques _~ get fonction mais computed() sait exactement de quoi il dépend
// computed permet de créer des valeurs dérivées basées sur d'autres signaux (dans ce cas studentsSignal)
// écoute automatiquement les signaux utilisés dans sa fonction.
// se recalcule automatiquement dès qu’un de ces signaux change.
// renvoie une valeur toujours à jour.
// est readonly (tu ne peux pas le modifier avec .set() ou .update()).
// ================================
  
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
   * Omit<Student, 'id'> signifie que l'objet student passé en paramètre ne doit pas contenir la propriété id il est généré automatiquement
   */
  addStudent(student: Omit<Student, 'id'>): Student {
    //a- créer un nouvel étudiant avec un ID unique apartir des données passées en paramètre
    const newStudent: Student = {
      ...student, //spread operator pour copier les propriétes de student tel qu'elles sont passées en paramètre
      id: this.nextId++ 
    };
    //b- mettre à jour le signal studentsSignal en ajoutant le nouvel étudiant 
    this.studentsSignal.update(students => [...students, newStudent]); //update est une methode des signaux pour modifier leur valeur
    
    console.log('✅ Service: Étudiant ajouté:', newStudent ); 
    return newStudent; //pourquoi on retourne le nouvel étudiant ? pour permettre au component qui a appelé cette méthode de récupérer l'ID généré
  }

  /**
   * UPDATE PARTIELLE d'un étudiant: 
   * Partiel signifie que l'objet updates peut contenuir une partie des propriétés de Student (name, email, promo) ou toutes les propriétés
   * Omit est utilisé pour exclure la propriété id de l'objet updates car on ne doit pas pouvoir modifier l'ID d'un étudiant
   */
  updateStudent(id: number, updates: Partial<Omit<Student, 'id'>>): boolean {
    //a-Trouver l'index de l'étudiant à mettre à jour par findIndex => retourne l'index de l'élément qui satisfait la condition OU -1 si non trouvé
    const index = this.studentsSignal().findIndex(s => s.id === id);
    
    if (index === -1) {
      console.warn(`⚠️ Service: Étudiant ID ${id} introuvable`);
      return false;
    }
    //b- Mettre à jour l'étudiant en fusionnant les données existantes avec les mises à jour
    this.studentsSignal.update(students => {
      const updated = [...students]; //creer une copie du tableau des étudiants car angular signaux nécessite une nouvelle référence pour détecter les changements 
      updated[index] = { ...updated[index], ...updates };//fusionne les anciennes données de l’étudiant avec les nouvelles reçues.
      return updated; //retourne le tableau des étudiants mis à jour
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
    // si la requete est vide ou contient uniquement des espaces; 
    if (!query.trim()) {
      return this.studentsSignal();
    }
    //else effectuer la recherche insensible à la casse
    const lowerQuery = query.toLowerCase();
    return this.studentsSignal().filter(student =>
      student.name.toLowerCase().includes(lowerQuery) ||
      student.email.toLowerCase().includes(lowerQuery)
    );
  }

  
}