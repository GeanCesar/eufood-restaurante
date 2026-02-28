import { Component, Input, OnInit } from '@angular/core';
import { Restaurante } from '../../model/restaurante';

@Component({
  selector: 'app-card-restaurante',
  imports: [],
  templateUrl: './card-restaurante.html',
  styleUrl: './card-restaurante.css',
})

export class CardRestaurante {
  @Input() restaurante? : Restaurante;
}
