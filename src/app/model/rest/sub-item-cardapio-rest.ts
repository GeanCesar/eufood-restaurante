import { CategoriaItemCardapio } from "../categoria-item-cardapio";
import { ItemCardapio } from "../item-cardapio";
import { ItemSubItem } from "../item-subitem";

export class SubItemCardapioRest {
    descricao? : string;
    nome? : string;
    tipoItem? : string;
    uuid? : string;
    valor? : number;
    categoria ? : CategoriaItemCardapio;
    uuidAssociacao ? : string;

    imagemBaixada ? : string;
    imagemCarregada ? : boolean;

    fromItemCardapio(item : ItemCardapio, associacao : string){
        this.uuid = item.uuid;
		this.nome = item.nome;
		this.valor = item.valor;
		this.descricao = item.descricao;
		this.imagemBaixada = item.imagemBaixada;
        this.imagemCarregada = item.imagemCarregada;
        this.tipoItem = item.tipoItem;
        this.categoria = item.categoria;
        this.uuidAssociacao = associacao;
    }

    fromItemSubItem(item : ItemSubItem) {
        this.uuid = item.subItem?.uuid;
        this.descricao = item.subItem?.descricao;
        this.nome = item.subItem?.nome;
        this.valor = item.subItem?.valor;
        this.tipoItem = item.subItem?.tipoItem;

        if(item.categoriaSubItem && item.categoriaSubItem.descricao && item.categoriaSubItem.uuidRestaurante) {
            this.categoria = new CategoriaItemCardapio(item.categoriaSubItem.descricao, item.categoriaSubItem.uuidRestaurante);            
            this.categoria.ordem = item.categoriaSubItem.ordem;
            this.categoria.uuid = item.categoriaSubItem.uuid;
        }

        this.uuidAssociacao = item.uuid;
        this.imagemBaixada = item.subItem?.imagemBaixada;
        this.imagemCarregada = item.subItem?.imagemCarregada;
    }
}