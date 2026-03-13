import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ICheckboxListener } from '../../model/listeners/checkbox-listener';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {

  public selecionado? : boolean;

  @Input() texto? : string;
  @Input() listenerCheck ? : ICheckboxListener;

  @Output() eventCheck = new EventEmitter();

  mudouEstado(value : boolean) {
    this.selecionado = value;
    this.eventCheck.emit(this.selecionado)
  }
}
