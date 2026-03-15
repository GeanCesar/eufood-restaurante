import { ConsultaPedidoSubItemRest } from "./consulta-pedido-sub-item-rest";

export class ConsultaPedidoItemRest{
    uuid ?: string ;
	quantidade ? : number;
	valorTotal ? : number;
	preco ? : number;
	desconto ? : number;
	descricao ? : string ;
	nome ? : string ;
	subItems ? : ConsultaPedidoSubItemRest[] ;
}