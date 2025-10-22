//ce composant recupaire le new_student du foarmulaire "student-form" et l'emet au parent "student_manager"
//pour l'ajouter a la liste des etudiants
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  imports: [FormsModule],
  template: `
    <div class="form-panel">
      <h3>Ajouter un étudiant</h3>
      <form (ngSubmit)="addStudent()">
        <div class="form-row">
          <label>Nom</label>
          <input [(ngModel)]="name" name="name" required />
        </div>
        <div class="form-row">
          <label>Email</label>
          <input [(ngModel)]="email" name="email" required type="email" />
        </div>
        <div class="form-row">
          <label>Promotion</label>
          <select [(ngModel)]="promo" name="promo" required>
            <option value="3A">3ème année</option>
            <option value="4A">4ème année</option>
          </select>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  `,
  styles: `
    .form-panel { background:#fafafa; border:1px solid #eee; border-radius:8px; padding:15px; }
    .form-row { display:flex; align-items:center; margin-bottom:10px; gap:10px; }
    label { width:110px; color:#555; }
    input, select { flex:1; padding:8px; border:1px solid #ccc; border-radius:4px; }
    button { background:#2ecc71; color:#fff; border:none; border-radius:5px; padding:8px 12px; cursor:pointer; }
    button:hover { background:#27ae60; }
  `
})
export class StudentForm {
  @Output() studentAdded = new EventEmitter<any>();
  name: string = '';
  email: string = '';
  promo: '3A' | '4A' = '3A';
  private nextId: number = 6;

  addStudent(): void {
    if (!this.name || !this.email || !this.promo) {
      return;
    }
    const newStudent = {
      id: this.nextId++,
      name: this.name,
      email: this.email,
      promo: this.promo
    };
    this.studentAdded.emit(newStudent);
    console.log('🧾 StudentFormComponent: Étudiant ajouté', newStudent);
    this.name = '';
    this.email = '';
    this.promo = '3A';
  }
}
