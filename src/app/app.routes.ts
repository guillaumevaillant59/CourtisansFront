import { Routes } from '@angular/router';
import { Acceuil } from './pages/acceuil/acceuil';
import { Parties } from './pages/parties/parties';

export const routes: Routes = [
    {path : "", component : Acceuil},
    {path : "parties", component : Parties}
];
