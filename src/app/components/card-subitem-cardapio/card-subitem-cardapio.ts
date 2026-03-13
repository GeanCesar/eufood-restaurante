import { Component, Input, ChangeDetectorRef, OnInit, signal } from '@angular/core';
import { ItemCardapio } from '../../model/item-cardapio';
import { NumberFormatPipe } from '../../util/number.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-card-subitem-cardapio',
  imports: [NumberFormatPipe],
  templateUrl: './card-subitem-cardapio.html',
  styleUrl: './card-subitem-cardapio.css',
})
export class CardSubitemCardapio {  

  @Input() item : ItemCardapio = new ItemCardapio;
  
}
