import { ConsultaPedidoRest } from "../rest/pedido/consulta-pedido-rest";

export interface IPedidoListener {
    onAtualizaStatus(pedido : ConsultaPedidoRest) : void;
}