import { Component, effect, OnInit, signal } from '@angular/core';
import { CardItemCardapio } from "../../components/card-item-cardapio/card-item-cardapio";
import { ItemCardapio } from '../../model/item-cardapio';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RespostaRequisicao } from '../../model/rest/resposta-requisicao';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from '../../components/footer/footer';
import { CategoriaItemCardapio } from '../../model/categoria-item-cardapio';
import { Button } from "../../components/button/button";
import { Modal } from "../../components/modal/modal";
import { ModalSimNao } from "../modal-sim-nao/modal-sim-nao";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { SubItemService } from '../../services/sub-item-service';
import { FormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ItemCardapioService } from '../../services/item-cardapio-service';
import { CategoriaItemService } from '../../services/categoria-item-service';

@Component({
  selector: 'app-alteracao-cardapio-item',
  imports: [CardItemCardapio, Header, Footer, Button, Modal, ModalSimNao, CdkDropList, CdkDrag, FormsModule, MatProgressBarModule],
  templateUrl: './alteracao-cardapio-item.html',
  styleUrl: './alteracao-cardapio-item.css',
})
export class AlteracaoCardapioItem implements OnInit {

  categorias = signal<CategoriaItemCardapio[]>([]);
  categoriasBuscadas : CategoriaItemCardapio[] = [];

  uuidRestaurante : string = "";

  carregando = signal<boolean>(true);

  constructor(private http:HttpClient, private router : Router,
       private route : ActivatedRoute,
       private subItemService : SubItemService,
       private itemService : ItemCardapioService,
       private categoriaItemService : CategoriaItemService) {}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((params: Params) => {
      this.uuidRestaurante = params['uuid_restaurante'];
    });
    
    this.listaCategorias();
  }

  drop(categoria : CategoriaItemCardapio, event: CdkDragDrop<ItemCardapio[]>) {
    moveItemInArray(categoria.itensAdicionados, event.previousIndex, event.currentIndex);
    this.atualizaOrdens();
  }

  atualizaOrdens() {
    for(let categoria of this.categorias()) {
      let i : number = 0;
      for(let item of categoria.itensAdicionados) {
        i++;
        if(item.uuid) {
          this.itemService.atualizaOrdem(this.uuidRestaurante, item.uuid, i).subscribe();
        }
      }
    }
  }

  cadastrarItem() {
    this.router.navigate(['controller/cadastro-item-cardapio'], { queryParams: { uuid_restaurante : this.uuidRestaurante}});
  }

  listaCategorias(){
    this.categorias.set([])
    this.categorias().splice; 

    this.categoriaItemService.listarCategorias(this.uuidRestaurante).subscribe(data => {
        for(let categoria of data) {
          categoria.itensAdicionados = [];
          this.categoriasBuscadas.push(categoria);
        }
        setTimeout(() => this.listaItens(), 100);
    }, () => {
      this.carregando.set(false);
    });
  }

  // Executa o GET para listagem de itens
  listaItens(){
    const url = '/restaurante/item_cardapio/listar';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    });
    
    const params = new HttpParams().set("uuid-restaurante", this.uuidRestaurante);

    const parametros = { params: params, headers : headers}

    this.http.get(url, parametros).subscribe(data => {
        let resposta : RespostaRequisicao = Object.create(RespostaRequisicao);
        resposta = {...resposta, ...data}  

        for(let item of resposta.extra as Array<ItemCardapio> ) {
          for(let categoria of this.categoriasBuscadas) {
            if(item.categoria?.uuid === categoria.uuid && item.uuid) {
              this.subItemService.getCategorias(this.uuidRestaurante, item.uuid).subscribe((subs) => {
                item.categoriaSubItens = subs;
              });

              categoria.itensAdicionados.push(item);
            }
          }
          
          if(item.uuid) {
            this.itemService.buscaImagem(item.uuid).subscribe((arquivo) => {
              var imagem = URL.createObjectURL(arquivo)  
              item.imagemBaixada = imagem;   
              item.imagemCarregada = true;
            });
          }
        }

        setTimeout(() => {
          this.categorias.set(this.categoriasBuscadas);
          this.carregando.set(false);
        }, 300);
    });
  }
}
