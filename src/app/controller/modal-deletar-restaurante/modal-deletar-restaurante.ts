import { Component, Input } from '@angular/core';
import { Button } from "../../components/button/button";
import { Modal } from '../../components/modal/modal';
import { ICardRestauranteListener } from '../../model/listeners/card-restaurante-listener';

@Component({
  selector: 'app-modal-deletar-restaurante',
  imports: [Button],
  templateUrl: './modal-deletar-restaurante.html',
  styleUrl: './modal-deletar-restaurante.css',
})
export class ModalDeletarRestaurante {

  @Input() modal? : Modal;

  listener? : ICardRestauranteListener;

  protected acaoNegativa() {
    this.modal?.toggle();
  }
  
  protected acaoPositiva() {
    this.modal?.toggle();
    if(this.listener) {
      this.listener.onSim();  
    }
  }

  public setListener(listener : ICardRestauranteListener){
    this.listener = listener;
  }

}
