import { CategoriaSubItem } from "./categoria-subitem";
import { ItemCardapio } from "./item-cardapio";

export class ItemSubItem{

    uuid ? : string;
    itemPrincipal ? : ItemCardapio;
    subItem ? : ItemCardapio;
    categoriaSubItem ? : CategoriaSubItem;
    
}