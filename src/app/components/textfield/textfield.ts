import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMaskDirective} from 'ngx-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
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
 
  changeInput(input: any): any {
    input.type = input.type === 'text' ? 'password' : 'text';
  }

  focusOut() {
    this.onFocusOut.emit()  
  }
}
