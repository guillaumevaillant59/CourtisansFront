import Carte from "./carte.model";

export default interface MainJoueur{
    id : number,
    cartes : Array<Carte>,
    jouerReine : boolean,
    jouerAdverse : boolean,
    jouerSoi : boolean
}