import { Component, EventEmitter, Input, OnInit, Output, signal, ViewChild, WritableSignal} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { OptionDataList } from '../../model/option-datalist';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-datalist',
  imports: [
    NgSelectComponent,
    CommonModule,
    FormsModule,
    NgSelectModule
],
  standalone: true,
  templateUrl: './datalist.html',
  styleUrl: './datalist.css',
})
export class Datalist {  

  itemSelecionado? : Object;
  
  @ViewChild('select') select ? : NgSelectComponent;

  @Input() placeholder ? : string;

  @Input() adicionaItem : boolean = false;

  @Input() itens? : OptionDataList[];

  @Output() onSeleciona = new EventEmitter();

  seleciona(objeto: Object|undefined) {
    this.onSeleciona.emit(objeto);
  }

  limpaSelecao(){
    this.select?.clearItem;
    this.itemSelecionado = undefined;
  }
}

export class ItemGenerico {
  label ? : string;
}
