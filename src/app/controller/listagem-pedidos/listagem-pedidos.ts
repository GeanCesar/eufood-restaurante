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
import { PedidoSelecionado } from "../../components/pedido-selecionado/pedido-selecionado";
import { IPedidoListener } from '../../model/listeners/pedido-listener';
import { ControlePedidosService } from '../../services/controle-pedidos-service';

@Component({
  selector: 'app-listagem-pedidos',
  imports: [CardPedido, MatProgressBar, Header, Footer, FaIconComponent, PedidoSelecionado],
  templateUrl: './listagem-pedidos.html',
  providers: [DatePipe],
  styleUrl: './listagem-pedidos.css',
})
export class ListagemPedidos implements OnInit, IPedidoListener {

  faBasketShopping = faBasketShopping;

  uuidRestaurante ? : string;
  restaurante = signal<Restaurante>(new Restaurante());
  pedidos = signal<ConsultaPedidoRest[]>([]);
  carregando = signal(true);

  pedidoSelecionado = signal<ConsultaPedidoRest>(new ConsultaPedidoRest());

  mostrandoNovosPedidos = signal<boolean>(false);

  constructor(
    private pedidoService : PedidoService,
    private datePipe: DatePipe,
    private route : ActivatedRoute,
    private restauranteService : RestauranteService,
    private controlePedidosService : ControlePedidosService
  ){}
   
  dataHoje ? : string;

  ngOnInit(): void {
    if(!this.uuidRestaurante) {
      this.route.queryParams.subscribe((params: Params) => {
        this.uuidRestaurante = params['uuid_restaurante'];
        this.restauranteService.buscaRestaurante(params['uuid_restaurante']).subscribe(data => {
          this.restaurante.set(data);
          this.buscaControle();
        }); 
        this.buscaPedidos();

        // Busca o controle de pedidos a cada 30 segundos
        setInterval(()=> { this.buscaControle() }, 30 * 1000);
      });
    } else {
      this.buscaPedidos();
      // Busca o controle de pedidos a cada 30 segundos
      setInterval(()=> { this.buscaControle() }, 30 * 1000);
    }
  }

  buscaControle() {
    if(this.restaurante() && this.restaurante().uuid) {
      this.controlePedidosService.getControle(this.restaurante().uuid).subscribe(data => {
        this.mostrandoNovosPedidos.set(data.possuiNovoPedido);
        if(data.possuiNovoPedido) {
          this.buscaPedidos();
        }
      });
    }
  }

  carregaPedido(pedido: ConsultaPedidoRest) {
    this.pedidoSelecionado.set(pedido);
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
        this.setPedidoSelecionado();
      }, () => {
        this.carregando.set(false);
      });
    }
  }

  onAtualizaStatus(pedidoSelecionado : ConsultaPedidoRest): void {
    this.pedidoSelecionado.set(pedidoSelecionado);
    this.buscaControle();
    this.buscaPedidos();
  }

  setPedidoSelecionado(){
    for(let pedido of this.pedidos()) {
      if(pedido.uuidPedido === this.pedidoSelecionado().uuidPedido) {
        this.pedidoSelecionado.set(pedido);
        return
      }
    }
  }

  getListener() : ListagemPedidos {
    return this;
  }

}
