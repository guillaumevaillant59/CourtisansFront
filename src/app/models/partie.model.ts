export default interface Partie {
    id : number,
    domaineReine : number,
    pioche : Array<number>,
    joueurs : Array<number>,
    nombreMaxJoueur : number,
    status : string
}