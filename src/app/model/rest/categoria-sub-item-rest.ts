import { SubItemCardapioRest } from "./sub-item-cardapio-rest";

export class CategoriaSubItemRest {
    uuid ? : string ;
	descricao ? : string ;
	quantidadeMinima ? : number;
	quantidadeMaxima ? : number;
    itens : SubItemCardapioRest[] = [];

	acordionAtivo = false;
}