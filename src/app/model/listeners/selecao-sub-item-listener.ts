import { ItemCardapio } from "../item-cardapio";

export interface ISelecaoSubItemListener{
    onConcluir(item : ItemCardapio) : void;
}