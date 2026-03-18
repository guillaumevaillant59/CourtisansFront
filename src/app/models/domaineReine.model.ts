import Disgrace from "./disgrace.model";
import Lumiere from "./lumiere.model";

export default interface DomaineReine{
    id : number,
    lumiere : Lumiere,
    disgrace : Disgrace
    path : string
}