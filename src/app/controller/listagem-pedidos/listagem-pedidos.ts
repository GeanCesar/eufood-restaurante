import { Component, OnInit, signal } from '@angular/core';
import { ConsultaPedidoRest } from '../../model/rest/pedido/consulta-pedido-rest';
import { CardPedido } from "../../components/card-pedido/card-pedido";
import { PedidoService } from '../../services/pedido-service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { MatProgressBar } from "@angular/material/progress-bar";
import { Header } from "../../components/header/header";
import { Footer } from '../../components/footer/footer';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RestauranteService } from '../../services/restaurante-service';
import { Restaurante } from '../../model/restaurante';

@Component({
  selector: 'app-listagem-pedidos',
  imports: [CardPedido, MatProgressBar, Header, Footer, FaIconComponent],
  templateUrl: './listagem-pedidos.html',
  providers: [DatePipe],
  styleUrl: './listagem-pedidos.css',
})
export class ListagemPedidos implements OnInit {  

  faBasketShopping = faBasketShopping;

  uuidRestaurante ? : string;
  restaurante = signal<Restaurante>(new Restaurante());
  pedidos = signal<ConsultaPedidoRest[]>([]);
  carregando = signal(true);

  constructor(private pedidoService : PedidoService, private datePipe: DatePipe, private route : ActivatedRoute, private restauranteService : RestauranteService){}

  dataHoje ? : string;

  ngOnInit(): void {
    if(!this.uuidRestaurante) {
      this.route.queryParams.subscribe((params: Params) => {
        this.uuidRestaurante = params['uuid_restaurante'];
        this.restauranteService.buscaRestaurante(params['uuid_restaurante']).subscribe(data => {
          this.restaurante.set(data);
        }); 
        this.buscaPedidos();
      });
    } else {
      this.buscaPedidos();
    }    
  }

  buscaPedidos() {
    let hoje = new Date();
    hoje.setDate(hoje.getDate() - 1);
    let dataFormatada = this.datePipe.transform(hoje, 'dd/MM/yyyy');
    if(dataFormatada && this.uuidRestaurante) {
      this.dataHoje = dataFormatada; 

      this.pedidoService.getPedidos(this.uuidRestaurante, this.dataHoje).subscribe(data => {
        this.pedidos.set(data);
        this.carregando.set(false);
      }, () => {
        this.carregando.set(false);
      });
    }
  }
}
