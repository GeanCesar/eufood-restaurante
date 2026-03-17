import { Component, Input, OnInit, signal } from '@angular/core';
import { ConsultaPedidoRest } from '../../model/rest/pedido/consulta-pedido-rest';
import { ItemPedido } from "../item-pedido/item-pedido";
import { MoneyPipe } from '../../util/currency.pipe';
import { Button } from "../button/button";
import { PedidoService } from '../../services/pedido-service';
import { IPedidoListener } from '../../model/listeners/pedido-listener';
import { ModalSimNao } from '../../controller/modal-sim-nao/modal-sim-nao';
import { Modal } from '../modal/modal';
import { IModalSimNaoListener } from '../../model/listeners/modal-sim-nao-listener';

@Component({
  selector: 'app-pedido-selecionado',
  imports: [ItemPedido, MoneyPipe, Button],
  templateUrl: './pedido-selecionado.html',
  styleUrl: './pedido-selecionado.css',
})
export class PedidoSelecionado implements IModalSimNaoListener{
  
  @Input() pedidoSelecionado : ConsultaPedidoRest = new ConsultaPedidoRest();
  @Input() pedidoListener ? : IPedidoListener;

  @Input() modalConfirmacao ? : ModalSimNao;
  @Input() modal ? : Modal;

  acaoAtual = "";

  constructor(private pedidoService : PedidoService) {}

  onSim(): void {
    this.atualizaStatus(this.acaoAtual);
  }

  cancelarPedido() {
    if(this.modalConfirmacao) {
      this.modalConfirmacao.mensagem = "Deseja cancelar o pedido selecionado?";      
      this.acaoAtual = "CANCELADO";
      this.modalConfirmacao.setListener(this);
      this.modal?.toggle();
    }
  }

  despacharPedido() {
    if(this.modalConfirmacao) {
      this.modalConfirmacao.mensagem = "Deseja despachar o pedido selecionado?";
      this.acaoAtual = "DESPACHADO";
      this.modalConfirmacao.setListener(this);
      this.modal?.toggle();
    }
  }
  
  confirmarPedido() {
    if(this.modalConfirmacao) {
      this.modalConfirmacao.mensagem = "Deseja confirmar o pedido selecionado?";      
      this.acaoAtual = "CONFIRMADO";
      this.modalConfirmacao.setListener(this)
      this.modal?.toggle();
    }
  }

  atualizaStatus(status : string){
    this.pedidoService.atualizarStatusPedido(status, this.pedidoSelecionado.uuidRestaurante, this.pedidoSelecionado.uuidPedido).subscribe(() => {
      if(this.pedidoListener) {
        this.pedidoListener.onAtualizaStatus(this.pedidoSelecionado);
      }
    });
  }
}


