import Carte from "./carte.model";
import DomaineReine from "./domaineReine.model";
import Joueur from "./joueur.model";

export default interface Partie {
    id : number,
    domaineReine : DomaineReine,
    pioche : Array<Carte>,
    joueurs : Array<Joueur>,
    nombreMaxJoueur : number,
    status : string
}