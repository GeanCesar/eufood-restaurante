import { Component, Input } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ConsultaPedidoRest } from '../../model/rest/pedido/consulta-pedido-rest';
import { NumberFormatPipe } from "../../util/number.pipe";
import { ConsultaPedidoStatusRest } from '../../model/rest/pedido/consulta-pedido-status-rest';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-card-pedido',
  imports: [FaIconComponent, NumberFormatPipe, DatePipe],
  templateUrl: './card-pedido.html',
  styleUrl: './card-pedido.css'
})
export class CardPedido {
  faAngleRight = faAngleRight;

  @Input() pedido ? : ConsultaPedidoRest;

  public getStatus() : ConsultaPedidoStatusRest{
    if(this.pedido) {
      if(this.pedido.status) {
        for(let stat of this.pedido.status) {
          return stat;
        }
      }
    }
		return new ConsultaPedidoStatusRest;
	}
}
