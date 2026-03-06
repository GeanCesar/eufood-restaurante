import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptionDataList } from '../../model/option-datalist';

@Component({
  selector: 'app-datalist',
  imports: [FormsModule],
  templateUrl: './datalist.html',
  styleUrl: './datalist.css',
})
export class Datalist {

  itemSelecionado? : Object;

  @Input() placeholder ? : string;
  @Input() itens ? : OptionDataList[];

}
