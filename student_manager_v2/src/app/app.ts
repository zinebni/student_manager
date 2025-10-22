import { Component, signal } from '@angular/core';
import { StudentManagerComponent } from './student-manager/student-manager';

@Component({
  selector: 'app-root',
  imports: [StudentManagerComponent],
  template: `

      
      <main class="app-main">
        <app-student-manager></app-student-manager>
      </main>

  `,
  styles: [`
   `]
})
export class App {
  protected readonly title = signal('student_app_v2');
}
