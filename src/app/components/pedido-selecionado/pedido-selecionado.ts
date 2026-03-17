import { Component, Input, OnInit, signal } from '@angular/core';
import { ConsultaPedidoRest } from '../../model/rest/pedido/consulta-pedido-rest';
import { ItemPedido } from "../item-pedido/item-pedido";
import { MoneyPipe } from '../../util/currency.pipe';
import { Button } from "../button/button";
import { PedidoService } from '../../services/pedido-service';
import { IPedidoListener } from '../../model/listeners/pedido-listener';

@Component({
  selector: 'app-pedido-selecionado',
  imports: [ItemPedido, MoneyPipe, Button],
  templateUrl: './pedido-selecionado.html',
  styleUrl: './pedido-selecionado.css',
})
export class PedidoSelecionado {
  
  @Input() pedidoSelecionado : ConsultaPedidoRest = new ConsultaPedidoRest();
  @Input() pedidoListener ? : IPedidoListener;

  constructor(private pedidoService : PedidoService) {}

  cancelarPedido() {
    this.atualizaStatus("CANCELADO");
  }
  despacharPedido() {
    this.atualizaStatus("DESPACHADO"); 
  }
  confirmarPedido() {
    this.atualizaStatus("CONFIRMADO");
  }

  atualizaStatus(status : string){
    this.pedidoService.atualizarStatusPedido(status, this.pedidoSelecionado.uuidRestaurante, this.pedidoSelecionado.uuidPedido).subscribe(() => {
      if(this.pedidoListener) {
        this.pedidoListener.onAtualizaStatus(this.pedidoSelecionado);
      }
    });
  }
}


