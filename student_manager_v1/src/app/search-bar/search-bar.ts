//==========================
// Composant de recherche : récupère le texte saisi par l’utilisateur
// et l’envoie au parent via un événement @Output sous forme de payload "searchQuery"
//----------enfant 
//0-recuperer le text du search bare grace au [(ngModel)]=searchtext sur l'input  et declancher l'evenement (input)="onSearchChanged()"
//1-initialiser l'objet output sur ce composant : @output shearChanged() = new eventEmitter<string>()
//2-definire la fonction qui va ce declancher à l'ecrit du user dans l'imput et qui  faire appele à l'evenement output 
//              onSearchChanged(): void {
//                       this.shearChanged.emit(this.searchtext)
//               }
//-----------parente
// template : <app-search-bar (searchChanged)="La_ParentFunction_quiVas_Recuperer_LePayload_Envoyer($event)"> </app-search-bar>
//                                ^
//                                |____l'@eventEmitter object instentié sur ce childe component
//exemple ParentFunctionSearchquery(query : string):void{
//                                             this.searchInput = query   
//                                   }  
//==========================
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  template: `
    <div class="search-bar">
      <input 
        [(ngModel)]="searchQuery" 
        (input)="onSearchChange()" 
        placeholder="Rechercher par nom ou email...">
      <button (click)="clearSearch()" >X</button>
    </div>
  `,
  styles: `
    .search-bar {
      display: flex;
      margin-bottom: 20px;
      gap: 10px;
    }
    .search-bar input {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1em;
    }
    .search-bar button {
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 15px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .search-bar button:hover { background-color: #c0392b; }
  `
})
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange(): void {
    console.log('🔍 SearchBarComponent: Recherche modifiée:', this.searchQuery);
    this.searchChanged.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchChanged.emit(this.searchQuery);
    console.log('🧹 SearchBarComponent: Recherche effacée.');
  }
}
