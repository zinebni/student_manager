//ce composant recupaire le new_student du foarmulaire "student-form" et l'emet au parent "student_manager"
//pour l'ajouter a la liste des etudiants
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  imports: [FormsModule],
  template: `
    <div class="form-panel" @formAnimation>
      <div class="form-header">
        <h3>➕ Ajouter un Étudiant</h3>
        <p class="form-subtitle">Remplissez le formulaire ci-dessous</p>
      </div>
      <form (ngSubmit)="addStudent()" class="form-content">
        <div class="form-row">
          <label for="name">Nom</label>
          <input
            id="name"
            [(ngModel)]="name"
            name="name"
            placeholder="Entrez le nom complet"
            required
          />
        </div>
        <div class="form-row">
          <label for="email">Email</label>
          <input
            id="email"
            [(ngModel)]="email"
            name="email"
            placeholder="exemple@email.com"
            required
            type="email"
          />
        </div>
        <div class="form-row">
          <label for="promo">Promotion</label>
          <select
            id="promo"
            [(ngModel)]="promo"
            name="promo"
            required
          >
            <option value="3A">3ème année</option>
            <option value="4A">4ème année</option>
          </select>
        </div>
        <button type="submit" class="btn-submit">Ajouter l'étudiant</button>
      </form>
    </div>
  `,
  styles: `
    .form-panel {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border: 1px solid rgba(46, 204, 113, 0.2);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease-in-out;
    }

    .form-panel:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }

    .form-header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(46, 204, 113, 0.3);
    }

    .form-header h3 {
      color: #2c3e50;
      font-size: 1.3rem;
      margin: 0 0 6px 0;
      font-weight: 700;
    }

    .form-subtitle {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin: 0;
      font-weight: 500;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      color: #2c3e50;
      font-weight: 600;
      font-size: 0.95rem;
    }

    input, select {
      padding: 12px 14px;
      border: 2px solid #e0e6ed;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s ease-in-out;
      background: #fff;
    }

    input::placeholder {
      color: #bdc3c7;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #2ecc71;
      box-shadow: 0 0 0 4px rgba(46, 204, 113, 0.1);
      background: #fff;
    }

    input:hover, select:hover {
      border-color: #2ecc71;
    }

    .btn-submit {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.3s ease-in-out;
      margin-top: 8px;
      box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
    }

    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
    }

    .btn-submit:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .form-panel {
        padding: 16px;
      }
      .form-row {
        gap: 6px;
      }
    }
  `,
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.4s 0.1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
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
