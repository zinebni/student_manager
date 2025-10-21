import { Component, signal } from '@angular/core';
import { StudentManagerComponent } from './student-manager/student-manager';

@Component({
  selector: 'app-root',
  imports: [StudentManagerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-app');
}
