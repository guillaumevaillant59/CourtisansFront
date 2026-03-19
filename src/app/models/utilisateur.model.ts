export default interface Utilisateur{
    id : number,
    email : string,
    password : string,
    roles : Array<string>,
    joueurs : Array<number>,
    pseudo : string
}