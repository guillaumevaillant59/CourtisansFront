import Carte from "./carte.model";

export default interface Lumiere {
    id : number,
    papillons : Array<Carte>,
    crapauds : Array<Carte>,
    rossignols : Array<Carte>,
    espions : Array<Carte>,
    cerfs : Array<Carte>,
    lapins : Array<Carte>,
    carpes : Array<Carte>
}