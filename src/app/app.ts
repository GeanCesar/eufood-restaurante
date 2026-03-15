import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CardPedido } from './components/card-pedido/card-pedido';
import { ListagemPedidos } from "./controller/listagem-pedidos/listagem-pedidos";


@Component({
  selector: 'app-root',
  imports: [NgSelectModule, FormsModule, RouterOutlet, CardPedido, ListagemPedidos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App { 

  
}
