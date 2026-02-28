import { Component, Input } from '@angular/core';
import { NgxMaskDirective} from 'ngx-mask';

@Component({
  selector: 'textfield',
  imports: [NgxMaskDirective],
  templateUrl: './textfield.html',
  styleUrl: './textfield.css',
})
export class Textfield {
  @Input() senha? : boolean = false;
  @Input() texto?: string;
  @Input() placeholder?: string;
  @Input() valor?: string;
  @Input() mascara ? : string;
  @Input() obrigatorio ? : boolean = false;

  changeInput(input: any): any {
    input.type = input.type === 'text' ? 'password' : 'text';
  }
}
