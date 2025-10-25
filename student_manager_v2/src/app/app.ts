import { animate, style, transition, trigger } from '@angular/animations';
import { Component, signal } from '@angular/core';
import { StudentManagerComponent } from './student-manager/student-manager';

@Component({
  selector: 'app-root',
  imports: [StudentManagerComponent],
  template: `
    <main class="app-main" @fadeInUp>
      <div class="app-header">
        <h1 class="app-title">{{ title() }}</h1>
        <p class="app-subtitle">Organisez et gérez vos étudiants facilement</p>
      </div>
      <app-student-manager></app-student-manager>
    </main>
  `,
  styles: [`
    .app-main {
      max-width: 1400px;
      margin: 0 auto;
      animation: fadeInUp 0.6s ease-out;
    }

    .app-header {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px 20px;
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(46, 204, 113, 0.1) 100%);
      border-radius: 12px;
      border: 1px solid rgba(52, 152, 219, 0.2);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease-in-out;
    }

    .app-header:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .app-title {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 10px 0;
      letter-spacing: -1px;
    }

    .app-subtitle {
      font-size: 1.1rem;
      color: #7f8c8d;
      margin: 0;
      font-weight: 500;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class App {
  protected readonly title = signal('StudentManager');
}
