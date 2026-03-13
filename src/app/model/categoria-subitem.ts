import { ItemCardapio } from "./item-cardapio";
import { SubItemCardapioRest } from "./rest/sub-item-cardapio-rest";

export class CategoriaSubItem {

    descricao ? : string;
    ordem ? : number;
    quantidadeMinima? : number;
    quantidadeMaxima? : number;
    uuid ? : string;
    uuidRestaurante ? : string;

    editando ? : boolean = false;
    itensAdicionados : SubItemCardapioRest[] = [];
    acordionAtivo = false;
    
    constructor(descricao : string) {
        this.descricao = descricao;
    }
}