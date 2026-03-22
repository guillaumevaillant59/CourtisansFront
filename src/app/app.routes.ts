import { Routes } from '@angular/router';
import { Acceuil } from './pages/acceuil/acceuil';
import { Parties } from './pages/parties/parties';
import { Connexion } from './pages/connexion/connexion';
import { Profile } from './pages/profile/profile';
import { NonTrouver } from './pages/non-trouver/non-trouver';
import { PartieComponent } from './pages/partie/partie';

export const routes: Routes = [
    {path : "", component : Acceuil},
    {path : "parties", component : Parties},
    {path : "connexion", component : Connexion },
    {path : "profile", component : Profile},
    {path : "partie/:id", component : PartieComponent},
    {path : "**", component : NonTrouver}
];
