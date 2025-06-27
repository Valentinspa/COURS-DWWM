import { Routes } from '@angular/router';
import { ListeRecetteComponent } from './liste-recette/liste-recette.component';
import { DetailRecetteComponent } from './detail-recette/detail-recette.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: "recettes", component: ListeRecetteComponent},
    {path: "recettes/:id", component: DetailRecetteComponent},
    {path: "", redirectTo: "recettes", pathMatch: "full"},
    {path: "**", component: PageNotFoundComponent}
];
