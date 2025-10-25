import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  imports: [],
  template: `
    <div class="stats-panel" @statsAnimation>
      <div class="stats-header">
        <h3>📊 Statistiques</h3>
      </div>
      <div class="stats-grid">
        <div class="stat-card total" @statCardAnimation>
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <p class="stat-label">Total Étudiants</p>
            <p class="stat-value">{{ stats.total }}</p>
          </div>
        </div>
        <div class="stat-card promo3a" @statCardAnimation>
          <div class="stat-icon">🎓</div>
          <div class="stat-content">
            <p class="stat-label">3ème Année</p>
            <p class="stat-value">{{ stats.promo3A }}</p>
          </div>
        </div>
        <div class="stat-card promo4a" @statCardAnimation>
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <p class="stat-label">4ème Année</p>
            <p class="stat-value">{{ stats.promo4A }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .stats-panel {
      background: linear-gradient(135deg, rgba(46, 204, 113, 0.05) 0%, rgba(46, 204, 113, 0.02) 100%);
      border: 2px solid rgba(46, 204, 113, 0.2);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 15px rgba(46, 204, 113, 0.1);
      transition: all 0.3s ease-in-out;
    }

    .stats-panel:hover {
      box-shadow: 0 8px 25px rgba(46, 204, 113, 0.15);
      border-color: rgba(46, 204, 113, 0.3);
    }

    .stats-header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(46, 204, 113, 0.2);
    }

    .stats-header h3 {
      color: #228b22;
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
    }

    .stat-card {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border: 2px solid rgba(46, 204, 113, 0.15);
      border-radius: 10px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.6s ease;
    }

    .stat-card:hover::before {
      left: 100%;
    }

    .stat-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 20px rgba(46, 204, 113, 0.2);
      border-color: rgba(46, 204, 113, 0.3);
    }

    .stat-card.total {
      border-color: rgba(52, 152, 219, 0.2);
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0.02) 100%);
    }

    .stat-card.total:hover {
      box-shadow: 0 8px 20px rgba(52, 152, 219, 0.2);
      border-color: rgba(52, 152, 219, 0.3);
    }

    .stat-card.promo3a {
      border-color: rgba(155, 89, 182, 0.2);
      background: linear-gradient(135deg, rgba(155, 89, 182, 0.05) 0%, rgba(155, 89, 182, 0.02) 100%);
    }

    .stat-card.promo3a:hover {
      box-shadow: 0 8px 20px rgba(155, 89, 182, 0.2);
      border-color: rgba(155, 89, 182, 0.3);
    }

    .stat-card.promo4a {
      border-color: rgba(230, 126, 34, 0.2);
      background: linear-gradient(135deg, rgba(230, 126, 34, 0.05) 0%, rgba(230, 126, 34, 0.02) 100%);
    }

    .stat-card.promo4a:hover {
      box-shadow: 0 8px 20px rgba(230, 126, 34, 0.2);
      border-color: rgba(230, 126, 34, 0.3);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 8px;
      position: relative;
      z-index: 1;
    }

    .stat-content {
      position: relative;
      z-index: 1;
    }

    .stat-label {
      color: #7f8c8d;
      font-size: 0.8rem;
      font-weight: 600;
      margin: 0 0 6px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      color: #2c3e50;
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
      line-height: 1;
    }

    @media (max-width: 768px) {
      .stats-panel {
        padding: 16px;
      }
      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 12px;
      }
      .stat-card {
        padding: 12px;
      }
      .stat-icon {
        font-size: 1.5rem;
      }
      .stat-value {
        font-size: 1.5rem;
      }
    }
  `,
  animations: [
    trigger('statsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.4s 0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('statCardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class Stats {
   @Input() stats: any = { total: 0, promo3A: 0, promo4A: 0 };
}
