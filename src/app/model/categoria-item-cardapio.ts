import { ItemCardapio } from "./item-cardapio";

export class CategoriaItemCardapio{
    descricao ? : string;
    ordem ? : number;
    uuid ? : string;
    uuidRestaurante ? : string;

    itensAdicionados : ItemCardapio[] = [];

    constructor(descricao : string, uuidRestaurante : string){
        this.descricao = descricao;
        this.uuidRestaurante = uuidRestaurante;
    }
}