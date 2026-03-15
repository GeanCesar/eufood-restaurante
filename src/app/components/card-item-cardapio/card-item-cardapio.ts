import { Component, Input, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ItemCardapio } from '../../model/item-cardapio';
import { NumberFormatPipe } from '../../util/number.pipe';
import { ItemSubItem } from '../../model/item-subitem';
import { CategoriaSubItem } from '../../model/categoria-subitem';
import { HttpClient } from '@angular/common/http';
import { SubItemCardapioRest } from '../../model/rest/cardapio/sub-item-cardapio-rest';
import { CardSubitemCardapio } from "../card-subitem-cardapio/card-subitem-cardapio";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IModalSimNaoListener } from '../../model/listeners/modal-sim-nao-listener';
import { Modal } from '../modal/modal';
import { ModalSimNao } from '../../controller/modal-sim-nao/modal-sim-nao';
import { ItemCardapioService } from '../../services/item-cardapio-service';

@Component({
  selector: 'app-card-item-cardapio',
  imports: [FontAwesomeModule, NumberFormatPipe, CardSubitemCardapio],
  templateUrl: './card-item-cardapio.html',
  styleUrl: './card-item-cardapio.css',
})
export class CardItemCardapio implements OnInit, IModalSimNaoListener {  
  faTimes = faTimesCircle;
  faPen = faPenToSquare;

  @Input() item ? : ItemCardapio;

  uuidRestaurante : string = "";

  @Input() modal ? : Modal;
  @Input() modalDeletarItem ? : ModalSimNao;

  constructor(private http : HttpClient,private router : Router, private route : ActivatedRoute, private itemService : ItemCardapioService){}

  onSim(): void {
    this.removerItem();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.uuidRestaurante = params['uuid_restaurante'];
    });
    
    this.buscaImagens();    
  }

  alterarItem() {
    this.router.navigate(['controller/cadastro-item-cardapio'], { queryParams: { uuid_restaurante : this.uuidRestaurante, uuid_item : this.item?.uuid}});    
  }

  mostraModal(){
    this.modalDeletarItem?.setListener(this);
    this.modal?.toggle();
  }

  toggleAccordian(event : any, index : any) {
    if(this.item && this.item.categoriaSubItens) {
      const element = event.target;
      element.classList.toggle("active");
      if (this.item.categoriaSubItens[index].acordionAtivo) {
        this.item.categoriaSubItens[index].acordionAtivo = false;
      } else {
        this.item.categoriaSubItens[index].acordionAtivo = true;
      }
      const panel = element.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  }

  removerItem() {
    if(this.uuidRestaurante && this.item && this.item.uuid) {
      this.itemService.removerItem(this.uuidRestaurante, this.item?.uuid).subscribe(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['controller/alteracao-item-cardapio'], { queryParams: { uuid_restaurante : this.uuidRestaurante}});
        });
      })
    }    
  }

  buscaImagens() {
    if(this.item && this.item.categoriaSubItens) {
      for(let categoria of this.item?.categoriaSubItens) {
        for(let sub of categoria.itens) {
          if(sub.uuid) {            
            this.itemService.buscaImagem(sub.uuid).subscribe(imagem => {
              let imagemCriada = URL.createObjectURL(imagem);
              sub.imagemBaixada = imagemCriada;
              sub.imagemCarregada = true;
            });            
          }
        }
      }
    }    
  }

  adicionaItemSubItem(categoria: CategoriaSubItem, itemSub: ItemSubItem) {
    let sub = new SubItemCardapioRest();
    sub.fromItemSubItem(itemSub);
    categoria.itensAdicionados.push(sub);
  }
}




