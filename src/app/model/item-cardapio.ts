import { CategoriaItemCardapio } from "./categoria-item-cardapio";
import { CategoriaSubItem } from "./categoria-subitem";
import { ItemSubItem } from "./item-subitem";
import { CategoriaSubItemRest } from "./rest/categoria-sub-item-rest";

export class ItemCardapio {
    descricao? : string;
    nome? : string;
    tipoItem? : string;
    uuid? : string;
    valor? : number;
    categoria ? : CategoriaItemCardapio;
    uuidRestaurante ? : string;
    ordem ? : number;

    categoriaSubItens ? : CategoriaSubItemRest[];

    imagemBaixada ? : string;
    imagemCarregada ? : boolean;
}