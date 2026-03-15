import { ConsultaPedidoItemRest } from "./consulta-pedido-item-rest";
import { ConsultaPedidoStatusRest } from "./consulta-pedido-status-rest";

export class ConsultaPedidoRest {
    items ? : ConsultaPedidoItemRest[];
	numeroPedido ? : string;
	uuidRestaurante ? : string;
	uuidUsuario ? : string;
	uuidPedido ? : string;
	valorTotal ? : number;
	valorFrete ? : number;
	dataCriacao ? : string;
	status ? : ConsultaPedidoStatusRest[];
}