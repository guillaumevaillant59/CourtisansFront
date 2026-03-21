export default interface Partie {
    id : number,
    domaineReine : number,
    pioche : Array<number>,
    joueurs : Array<number>,
    nombreJoueurMax : number,
    status : string
}