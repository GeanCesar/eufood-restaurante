import { Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { NgxMaskDirective} from 'ngx-mask';
import { CurrencyMaskConfig, CurrencyMaskModule } from "ng2-currency-mask";
import { FormsModule } from "@angular/forms";
import { CurrencyI18nDirective } from '../../util/currency-i18n.directive';


@Component({
  selector: 'textfield',
  imports: [NgxMaskDirective, CurrencyMaskModule, FormsModule, CurrencyI18nDirective],
  templateUrl: './textfield.html',
  styleUrl: './textfield.css',
})
export class Textfield {

  @Input() senha? : boolean = false;
  @Input() texto?: string;
  @Input() placeholder?: string;
  @Input() valor : string = "";
  @Input() mascara ? : string;
  @Input() monetario ? : boolean;
  @Input() obrigatorio ? : boolean = false;  
  @Input() valorNumerico ? : number;

  @Output() onFocusOut = new EventEmitter();
  
  @ViewChild('input') input ? : Input;

  changeInput(input: any): any {
    input.type = input.type === 'text' ? 'password' : 'text';
  }

  focusOut() {
    this.onFocusOut.emit()  
  }
}
