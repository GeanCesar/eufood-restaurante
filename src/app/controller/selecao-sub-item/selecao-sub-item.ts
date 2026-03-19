import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { faCircle, faGrip, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ItemCardapio } from '../../model/item-cardapio';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../util/number.pipe';
import { Textfield } from "../../components/textfield/textfield";
import { CategoriaSubItem } from '../../model/categoria-subitem';
import { Datalist, ItemGenerico } from "../../components/datalist/datalist";
import { OptionDataList } from '../../model/option-datalist';
import { FormsModule } from "@angular/forms";
import { ItemSubItem } from '../../model/item-subitem';
import { CadastrarCategoriaSubItemInterceptor } from '../../model/rest/cardapio/cadastrar-categoria-sub-item-interceptor';
import { SubItemCardapioRest } from '../../model/rest/cardapio/sub-item-cardapio-rest';
import { Modal } from "../../components/modal/modal";
import { ModalSelecaoItem } from "../modal-selecao-item/modal-selecao-item";
import { ISelecaoSubItemListener } from '../../model/listeners/selecao-sub-item-listener';
import { ActivatedRoute, Params } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from '../../components/footer/footer';
import { SubItemService } from '../../services/sub-item-service';

@Component({
  selector: 'app-selecao-sub-item',
  imports: [FaIconComponent, CdkDropList, CdkDrag, CommonModule, NumberFormatPipe, Textfield, Datalist, FormsModule, Modal, ModalSelecaoItem, Header, Footer],
  templateUrl: './selecao-sub-item.html',
  styleUrl: './selecao-sub-item.css',
})
export class SelecaoSubItem implements OnInit, ISelecaoSubItemListener {

  faGrip = faGrip;
  faCircle = faCircle;  
  faTimes = faCircleXmark;

  @ViewChild('modal_selecao_subitem') modalSelecaoItem ? : ModalSelecaoItem;
  @ViewChild('modal') modal ? : Modal;
  
  categorias = signal<CategoriaSubItem[]>([]);
  categoriaSelecionada = signal<CategoriaSubItem>(new CategoriaSubItem(""));  
  subItensSelecionados = signal<SubItemCardapioRest[]>([]);
  
  constructor(private http:HttpClient, private route: ActivatedRoute, private subItemService : SubItemService) {}

  uuidItemPrincipal : string = "";
  uuidRestaurante : string = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.uuidItemPrincipal = params['uuid_item_principal'];
      this.uuidRestaurante = params['uuid_restaurante'];
      this.listaCategorias();
    });
  }

  drop(event: CdkDragDrop<ItemCardapio[]>) {
    moveItemInArray(this.subItensSelecionados(), event.previousIndex, event.currentIndex);
    if(event.previousIndex != event.currentIndex) {
      this.atualizaOrdem();        
    }
  }

  mostraModal(){
    this.modalSelecaoItem?.setListener(this);
    this.modalSelecaoItem?.setItemsIgnored(this.subItensSelecionados())
    this.modalSelecaoItem?.setUuidRestaurante(this.uuidRestaurante);
    this.modalSelecaoItem?.mostrarModal();
  }

  async atualizaOrdem(){
    let i = 0;
    for(let subItem of this.subItensSelecionados()) {
      i++;
      (async () => {
        if(subItem.uuidAssociacao) {
          this.enviaAtualizacaoOrdem(subItem.uuidAssociacao, i);
        }        
      })();
    }
  }

  onConcluir(item: ItemCardapio): void {
    let subItemRest = new SubItemCardapioRest();
    subItemRest.fromItemCardapio(item, "");
    
    this.categoriaSelecionada().itensAdicionados?.unshift(subItemRest);
    this.subItensSelecionados.set(this.categoriaSelecionada().itensAdicionados);
    this.associaNovoSubItem(subItemRest, this.categoriaSelecionada());
  }

  alterarCategoria(event: any) {
    if(event != null) {
      if((event as CategoriaSubItem).uuid) {
        this.categoriaSelecionada.set(event as CategoriaSubItem);
      } else {

        if(event instanceof CategoriaSubItem) {
          this.categoriaSelecionada.set(event as CategoriaSubItem);
        } else {
          event = event as ItemGenerico;
          let categoria = new CategoriaSubItem(event.label);
          
          categoria.quantidadeMinima = 0;
          categoria.quantidadeMaxima = 0;
          this.categoriaSelecionada.set(categoria);
          this.categorias().push(categoria);
          this.cadastraNovaCategoria();
        }
      }
      
      if(this.categoriaSelecionada().uuid) {
        this.getSubItensPorCategoria(this.categoriaSelecionada().uuid);
      }      
    }
  }

  getCategorias() : OptionDataList[] {
      let options : OptionDataList[] = [];
  
      if(!this.categorias) {
        return options;
      }

      for(let categoria of this.categorias()) {
        const option = new OptionDataList();
        option.objeto = categoria;
        option.texto = categoria.descricao;
        options.push(option);
      }   
  
      return options;
  }

  atualizaLista(){
    if(this.categoriaSelecionada && this.categoriaSelecionada().itensAdicionados) {
      this.subItensSelecionados.set(this.categoriaSelecionada().itensAdicionados);
    }
  }

  remover(item: SubItemCardapioRest) {
    if(!item.uuidAssociacao){
      return;
    }

    const url = '/restaurante/sub_item/remover_associacao';

    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
      });
    
    const params = new HttpParams().set("uuid-associacao", item.uuidAssociacao);

    const parametros = { params: params, headers : headers}

    this.http.delete(url, parametros).subscribe(() => {
        this.getSubItensPorCategoria(this.categoriaSelecionada().uuid);
      }, error => {
        console.log(error);
    });
  }

  // Associa novos subitens via requisição PUT 
  associaNovoSubItem(subItem : SubItemCardapioRest, categoria: CategoriaSubItem) {   
    
    if(subItem.uuid && categoria.uuid) {
      this.subItemService.enviaAtualizacaoOrdem(subItem.uuid, 0).subscribe(data => {
        if(data) {
            subItem.uuidAssociacao = data as string;
            this.atualizaOrdem();
          }
      });
    }
  }

  // Atualiza ordens dos itens via requisição PATCH
  enviaAtualizacaoOrdem(uuid : string, ordem : number) {
    if(this.categoriaSelecionada().uuid) {
      const url = '/restaurante/sub_item/atualizar_ordem';

      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        });

      const params = new HttpParams().set("uuid-item-subitem", uuid).set("ordem", ordem.toString());

      const parametros = { params: params, headers : headers}

      this.http.patch(url, "", parametros).subscribe(() => {
        
        }, error => {
          console.log(error);
        });
    }    
  }

  // Executa o PATCH para atualização da categoria
  atualizaCategoria() {
    if(this.categoriaSelecionada() && this.categoriaSelecionada().uuid) {

      const url = '/restaurante/sub_item/categoria/atualizar';

      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
      });
      
      const params = new HttpParams().set("uuid-categoria", this.categoriaSelecionada().uuid + "");

      const parametros = { params: params, headers : headers}

      this.categoriaSelecionada().uuidRestaurante = this.uuidRestaurante;

      this.http.patch(url, new CadastrarCategoriaSubItemInterceptor(this.categoriaSelecionada()), parametros).subscribe(() => {
        
        }, error => {
          console.log(error);
        });
    }    
  }

  cadastraNovaCategoria(){
    const url = '/restaurante/sub_item/categoria/cadastrar';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    });

    this.categoriaSelecionada().uuidRestaurante = this.uuidRestaurante;

    this.http.post(url, new CadastrarCategoriaSubItemInterceptor(this.categoriaSelecionada()), {      
        headers : headers,
        observe: 'events',
        reportProgress: true
      }).subscribe(data => {
        if(data.type == HttpEventType.Response) {
          
        }        
      }, error => {
        console.log(error);
      });
  }

  getSubItensPorCategoria(uuidCategoria : string | undefined) {
    const url = "/restaurante/sub_item/categoria/listar_sub_items?uuid-item-principal=" + this.uuidItemPrincipal + "&uuid-categoria=" + uuidCategoria;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    });

    this.http.get<Array<any>>(url,  { headers : headers}).subscribe(data => {
      if(this.categoriaSelecionada) {
        this.categoriaSelecionada().itensAdicionados = [];
        this.subItensSelecionados().splice;

        if((data).length <= 0) {
          this.atualizaLista();
        }
      }

      for(let item of data as Array<ItemSubItem> ) {
        if(item.subItem && this.categoriaSelecionada().itensAdicionados && item.uuid) {
          let subItemRest = new SubItemCardapioRest();
          subItemRest.fromItemCardapio(item.subItem, item.uuid);
          this.categoriaSelecionada().itensAdicionados?.push(subItemRest);
          setTimeout(() => {
            if(item.subItem){
              this.buscarImagensSubItens(subItemRest);
            }
          }, 100);
        }
      }
    });
  }

  async buscarImagensSubItens(subItem: SubItemCardapioRest ) {    
    this.buscaImagem(subItem);
  }

  // Faz o GET para retorno das categorias cadastradas
  listaCategorias(){
    const url = '/restaurante/sub_item/categoria/listar?uuid-restaurante=' + this.uuidRestaurante;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    });

    this.http.get<Array<CategoriaSubItem>>(url,  { headers : headers}).subscribe(data => {
        for(let categoria of data) {
          this.categorias.update(values => [...values, categoria]);
        }
    });
  }  

  async buscaImagem(item : SubItemCardapioRest | ItemCardapio) : Promise<void> {  
    const url = 'restaurante/sub_item/imagem_item?uuid-item-cardapio=' + item.uuid;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    this.http.get(url, {
        headers : headers,
        responseType: 'blob', observe: 'response'
      }).subscribe(data => {
        var imagem = URL.createObjectURL(data.body as Blob)

        item.imagemBaixada = imagem;   
        item.imagemCarregada = true;

        setTimeout(() => {
            this.atualizaLista();
          }, 10);
    });
  }
}


