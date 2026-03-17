import { ConsultaPedidoItemRest } from "./consulta-pedido-item-rest";
import { ConsultaPedidoStatusRest } from "./consulta-pedido-status-rest";

export class ConsultaPedidoRest {
    items : ConsultaPedidoItemRest[] = [];
	numeroPedido ? : string;
	uuidRestaurante : string = "";
	uuidUsuario : string = "";
	uuidPedido : string = "";
	valorTotal : number = 0;
	valorFrete : number = 0;
	dataCriacao ? : string;
	status : ConsultaPedidoStatusRest[] = [];
}