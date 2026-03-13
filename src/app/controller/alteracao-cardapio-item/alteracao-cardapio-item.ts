import { Component, OnInit, signal } from '@angular/core';
import { CardItemCardapio } from "../../components/card-item-cardapio/card-item-cardapio";
import { ItemCardapio } from '../../model/item-cardapio';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from '../../components/footer/footer';
import { CategoriaItemCardapio } from '../../model/categoria-item-cardapio';
import { Button } from "../../components/button/button";
import { Modal } from "../../components/modal/modal";
import { ModalSimNao } from "../modal-sim-nao/modal-sim-nao";
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { SubItemService } from '../../services/sub-item-service';
import { FormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ItemCardapioService } from '../../services/item-cardapio-service';
import { CategoriaItemService } from '../../services/categoria-item-service';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-alteracao-cardapio-item',
  imports: [CardItemCardapio, Header, Footer, Button, Modal, ModalSimNao, CdkDropList, CdkDrag, FormsModule, MatProgressBarModule, FaIconComponent],
  templateUrl: './alteracao-cardapio-item.html',
  styleUrl: './alteracao-cardapio-item.css',
})
export class AlteracaoCardapioItem implements OnInit {

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

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

  abaixarCategoria(categoria: CategoriaItemCardapio) {
    if(categoria && categoria.ordem) {
      if(this.categorias().length == categoria.ordem){
        return;
      }

      moveItemInArray(this.categorias(), categoria.ordem - 1, categoria.ordem + 1);
      let itemAnterior = this.categorias()[categoria.ordem - 1];
      if(itemAnterior && itemAnterior.ordem) {
        itemAnterior.ordem = itemAnterior.ordem - 1;
      }      
      categoria.ordem = categoria.ordem + 1;
      this.atualizaOrdensCategorias();
    }
  }

  subirCategoria(categoria: CategoriaItemCardapio) {
    if(categoria.ordem == 1 || categoria.ordem == 0){
      return;
    }

    if(categoria && categoria.ordem) {
      moveItemInArray(this.categorias(), categoria.ordem - 1, categoria.ordem - 2); 
      let itemPosterior = this.categorias()[categoria.ordem - 1];
      if(itemPosterior && itemPosterior.ordem) {
        itemPosterior.ordem = itemPosterior.ordem + 1
      }
      categoria.ordem = categoria.ordem - 1;
      this.atualizaOrdensCategorias();
    }
  }

  drop(categoria : CategoriaItemCardapio, event: CdkDragDrop<ItemCardapio[]>) {
    moveItemInArray(categoria.itensAdicionados, event.previousIndex, event.currentIndex);
    this.atualizaOrdens();
  }

  atualizaOrdensCategorias() {    
    let i : number = 0;
    for(let categoria of this.categorias()) {
        i++;
        if(categoria.uuid && categoria.ordem)
          this.categoriaItemService.atualizarOrdem(this.uuidRestaurante, categoria.uuid, categoria.ordem).subscribe();
    }
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

    this.http.get<Array<ItemCardapio>>(url, parametros).subscribe(data => {
        for(let item of data ) {
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
    }, error => {
        this.categorias.set(this.categoriasBuscadas);
        this.carregando.set(false);
    });
  }
}
