import { Component, Input } from '@angular/core';
import { Button } from "../../components/button/button";
import { Modal } from '../../components/modal/modal';
import { IModalSimNaoListener } from '../../model/listeners/modal-sim-nao-listener';

@Component({
  selector: 'app-modal-sim-nao',
  imports: [Button],
  templateUrl: './modal-sim-nao.html',
  styleUrl: './modal-sim-nao.css',
})
export class ModalSimNao {

  @Input() modal? : Modal;
  @Input() mensagem ? : string;

  listener? : IModalSimNaoListener;

  protected acaoNegativa() {
    this.modal?.toggle();
  }
  
  protected acaoPositiva() {
    this.modal?.toggle();
    if(this.listener) {
      this.listener.onSim();  
    }
  }

  public setListener(listener : IModalSimNaoListener){
    this.listener = listener;
  }

}
