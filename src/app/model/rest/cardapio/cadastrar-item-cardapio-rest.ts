import { ItemCardapio } from "../../item-cardapio";

export class CadastrarItemCardapioRest{
    uuidRestaurante ? : string;
    nome? : string;
    descricao? : string;
    valor? : number;
    uuidCategoria ? : string;

    fromItemCardapio(item : ItemCardapio) {
        this.uuidRestaurante = item.uuidRestaurante;
        this.nome = item.nome;
        this.valor = Number((item.valor + "").replace(",", ".")) as number; 
        this.descricao = item.descricao;
        this.uuidCategoria = item.categoria?.uuid;
    }
}