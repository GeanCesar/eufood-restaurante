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
import { Restaurante } from '../../model/restaurante';
import { RestauranteService } from '../../services/restaurante-service';

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

  restaurante : Restaurante = new Restaurante();

  carregando = signal<boolean>(true);

  constructor(private http:HttpClient, private router : Router,
       private route : ActivatedRoute,
       private subItemService : SubItemService,
       private itemService : ItemCardapioService,
       private restauranteService : RestauranteService,
       private categoriaItemService : CategoriaItemService) {}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((params: Params) => {
      this.restaurante = new Restaurante();
      this.restaurante.uuid = params['uuid_restaurante'];

      if(this.restaurante.uuid) {
        this.restauranteService.buscaRestaurante(this.restaurante.uuid).subscribe(data => {
          this.restaurante = data;
          this.listaCategorias();
        });
      }
      
    });
    
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
        if(categoria.uuid && categoria.ordem && this.restaurante.uuid)
          this.categoriaItemService.atualizarOrdem(this.restaurante.uuid, categoria.uuid, categoria.ordem).subscribe();
    }
  }

  atualizaOrdens() {
    for(let categoria of this.categorias()) {
      let i : number = 0;
      for(let item of categoria.itensAdicionados) {
        i++;
        if(item.uuid && this.restaurante.uuid) {
          this.itemService.atualizaOrdem(this.restaurante.uuid, item.uuid, i).subscribe();
        }
      }
    }
  }

  cadastrarItem() {
    this.router.navigate(['controller/cadastro-item-cardapio'], { queryParams: { uuid_restaurante : this.restaurante.uuid}});
  }

  listaCategorias(){
    this.categorias.set([])
    this.categorias().splice; 

    if(this.restaurante.uuid){
      this.categoriaItemService.listarCategorias(this.restaurante.uuid).subscribe(data => {
          for(let categoria of data) {
            categoria.itensAdicionados = [];
            this.categoriasBuscadas.push(categoria);
          }
          setTimeout(() => this.listaItens(), 100);
      }, () => {
        this.carregando.set(false);
      });
    }
    
  }
  
  listaItens(){
    if(this.restaurante.uuid){
      this.itemService.listaItens(this.restaurante.uuid).subscribe(data => {
          for(let item of data) {
            for(let categoria of this.categoriasBuscadas) {
                if(item.categoria?.uuid === categoria.uuid && item.uuid && this.restaurante.uuid) {
                this.subItemService.getCategorias(this.restaurante.uuid, item.uuid).subscribe((subs) => {
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
      }, () => {
          this.categorias.set(this.categoriasBuscadas);
          this.carregando.set(false);
      });
    }    
  }
}
