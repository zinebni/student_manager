import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  imports: [],
  template: `
    <div class="stats-panel">
      <h3>Statistiques des étudiants</h3>
      <p><strong>Total étudiants :</strong> {{ stats.total }}</p>
      <p><strong>3ème année :</strong> {{ stats.promo3A }}</p>
      <p><strong>4ème année :</strong> {{ stats.promo4A }}</p>
    </div>
  `,
  styles: `
    .stats-panel {
      background-color: #e6ffe6;
      border: 1px solid #27ae60;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .stats-panel h3 { color: #228b22; margin-top: 0; border-bottom: 1px solid #27ae60; padding-bottom: 10px; margin-bottom: 15px; }
    .stats-panel p { margin-bottom: 5px; }
  `
  
})
export class Stats {
   @Input() stats: any = { total: 0, promo3A: 0, promo4A: 0 };
}
