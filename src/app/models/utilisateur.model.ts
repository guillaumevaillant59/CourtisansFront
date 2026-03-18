import Joueur from "./joueur.model"

export default interface Utilisateur{
    id : number,
    email : string,
    password : string,
    joueurs : Array<Joueur>,
    pseudo : string
}