import { Component, Input, OnInit, signal } from '@angular/core';
import { ConsultaPedidoItemRest } from '../../model/rest/pedido/consulta-pedido-item-rest';
import { ItemCardapioService } from '../../services/item-cardapio-service';
import { MoneyPipe } from '../../util/currency.pipe';

@Component({
  selector: 'app-item-pedido',
  imports: [MoneyPipe],
  templateUrl: './item-pedido.html',
  styleUrl: './item-pedido.css',
})
export class ItemPedido implements OnInit{ 

  @Input() item : ConsultaPedidoItemRest = new ConsultaPedidoItemRest;

  imagemBaixada = signal("");

  constructor(private itemService : ItemCardapioService) {}


  ngOnInit(): void {
    this.buscaImagemItem();
  }

  buscaImagemItem() {
      if(this.item.uuid) {
        this.itemService.buscaImagem(this.item.uuid).subscribe(data => {
          let imagemCriada = URL.createObjectURL(data);
          this.imagemBaixada.set(imagemCriada);
        });
      }
    
  }
}
