import { CategoriaSubItem } from "../../categoria-subitem";

export class CadastrarCategoriaSubItemInterceptor{
    descricao ? : string;
	ordem ? : number;
	uuidRestaurante ? : string;
	quantidadeMinima ? : number;
	quantidadeMaxima ? : number;

	constructor(categoria : CategoriaSubItem){
		this.descricao = categoria.descricao;
		this.ordem = categoria.ordem;
		this.uuidRestaurante = categoria.uuidRestaurante;
		this.quantidadeMinima = categoria.quantidadeMinima;
		this.quantidadeMaxima = categoria.quantidadeMaxima;
	}
}