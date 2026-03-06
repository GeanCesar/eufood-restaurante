import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  @Input() selecionado? : boolean;
  @Input() texto? : string;
}
