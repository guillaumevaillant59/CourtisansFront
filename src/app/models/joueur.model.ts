import DomaineJoueur from "./domaineJoueur.model";
import MainJoueur from "./mainJoueur.model";
import MissionBlanche from "./missionBlanche.model";
import MissionBleue from "./missionBleue.model";
import Partie from "./partie.model";
import Utilisateur from "./utilisateur.model";

export default interface Joueur{
    id : number,
    utilisateur : Utilisateur,
    partie : Partie,
    main : MainJoueur,
    domaine : DomaineJoueur,
    missionBlanche : MissionBlanche,
    missionBleue : MissionBleue,
    points : number,
    position : number,
    actif : boolean
}