import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  @Input() texto ? : string;
  @Input() disabled ? : boolean;
  @Input() estilo ? : string;
}
