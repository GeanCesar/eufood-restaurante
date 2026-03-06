import { CategoriaItemCardapio } from "./categoria-item-cardapio";

export class ItemCardapio {
    descricao? : string;
    nome? : string;
    tipoItem? : string;
    uuid? : string;
    valor? : number;
    categoria ? : CategoriaItemCardapio;
}