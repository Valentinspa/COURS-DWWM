import { Component } from '@angular/core';
import { BorderCardDirective } from '../border-card.directive';
import { TypeColorPipe } from '../type-color.pipe';
import { Recette } from '../Recette';
import { RECETTES } from '../RecetteList';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-recette',
  imports: [BorderCardDirective, TypeColorPipe, CommonModule],
  standalone: true,
  templateUrl: './liste-recette.component.html',
  styleUrl: './liste-recette.component.css'
})
export class ListeRecetteComponent {
  recetteListe: Recette[] = RECETTES;

  constructor(private router: Router){}
  goToRecette(recette: Recette)
  {
    this.router.navigate(["/recettes", recette.id]);
  }
}
