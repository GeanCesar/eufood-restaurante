import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';
import { SelecaoSubItem } from "./controller/selecao-sub-item/selecao-sub-item";

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CadastroItemCardapio } from "./controller/cadastro-item-cardapio/cadastro-item-cardapio";
import { AlteracaoCardapioItem } from "./controller/alteracao-cardapio-item/alteracao-cardapio-item";


@Component({
  selector: 'app-root',
  imports: [NgSelectModule, FormsModule, RouterOutlet, SelecaoSubItem, CadastroItemCardapio, AlteracaoCardapioItem],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App { 

  
}
