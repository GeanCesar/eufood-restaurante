import { Component, OnInit, signal } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faGrip, faCircle, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

import { CategoriaSubItem } from '../../model/categoria-subitem';
import { Textfield } from "../../components/textfield/textfield";
import { OptionDataList } from '../../model/option-datalist';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RespostaRequisicao } from '../../model/rest/resposta-requisicao';
import { CadastrarCategoriaSubItemInterceptor } from '../../model/rest/cadastrar-categoria-sub-item-interceptor';
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-selecao-categoria-sub-item',
  imports: [CdkDropList, CdkDrag, FaIconComponent, Textfield, FormsModule, Header],
  templateUrl: './selecao-categoria-sub-item.html',
  styleUrl: './selecao-categoria-sub-item.css',
})

export class SelecaoCategoriaSubItem implements OnInit{


  faGrip = faGrip;
  faCircle = faCircle;  
  faTimes = faCircleXmark;

  categorias = signal<CategoriaSubItem[]>([]);

  categoriaSelecionada = signal<CategoriaSubItem>(new CategoriaSubItem(""));

  editando : boolean = false;

  constructor(private http:HttpClient) {}  

  ngOnInit(): void {
    this.listaCategorias();
  }

  drop(event: CdkDragDrop<CategoriaSubItem[]>) {
    moveItemInArray(this.categorias(), event.previousIndex, event.currentIndex);
  }

  remover(categoria: CategoriaSubItem) {
    this.categoriaSelecionada.set(categoria);
    this.removerCategoria();
  }  

  adicionaNovo() {
    const categoria = new CategoriaSubItem("Categoria " + (this.categorias.length + 1));
    categoria.editando = true;
    categoria.uuidRestaurante = "1d77cd66-78c4-4d7a-847b-242f354f25e9";
    this.categorias().unshift(categoria);
    this.categoriaSelecionada.set(categoria);
    this.adicionaCategoria();
  }

  iniciaEdicao(categoria : CategoriaSubItem) {
    this.categoriaSelecionada.set(categoria);
    categoria.editando = true;
  }

  finalizaEdicao(categoria : CategoriaSubItem) {
    categoria.editando = false;
    categoria.uuidRestaurante = "1d77cd66-78c4-4d7a-847b-242f354f25e9";
    this.categoriaSelecionada.set(categoria);
    this.atualizaCategoria();
  }

  getCategorias() : OptionDataList[] {
    let options : OptionDataList[] = [];

    for(let categoria of this.categorias()) {
      const option = new OptionDataList();
      option.objeto = categoria;
      option.texto = categoria.descricao;
      options.push(option);
    }   

    return options;
  }

   // Executa o POST para cadastrar a categoria
  adicionaCategoria() {
    if(this.categoriaSelecionada()) {
      const url = '/restaurante/sub_item/categoria/cadastrar';

      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
      });

      let categoriaRest = new CadastrarCategoriaSubItemInterceptor(this.categoriaSelecionada());

      this.http.post(url, categoriaRest, {      
        headers : headers
      }).subscribe(data => {
          let resposta = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data}

          let uuid = (resposta as RespostaRequisicao).extra as string;
          this.categoriaSelecionada().uuid = uuid;
        }, error => {
          console.log(error);
        });
    }    
  }

   // Executa o DELETE para atualização da categoria
  removerCategoria() {
    if(this.categoriaSelecionada() && this.categoriaSelecionada().uuid) {

      const url = '/restaurante/sub_item/categoria/remover';

      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
      });
      
      const params = new HttpParams().set("uuid-categoria", this.categoriaSelecionada().uuid + "");

      const parametros = { params: params, headers : headers}

      this.http.delete(url, parametros).subscribe(data => {
          let resposta = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data}
          this.categorias.set([])
          this.categorias().splice;
          this.listaCategorias();
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

      this.categoriaSelecionada().uuidRestaurante = "1d77cd66-78c4-4d7a-847b-242f354f25e9";

      this.http.patch(url, new CadastrarCategoriaSubItemInterceptor(this.categoriaSelecionada()), parametros).subscribe(data => {
          let resposta = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data}
        }, error => {
          console.log(error);
        });
    }    
  }

  // Faz o GET para retorno das categorias cadastradas
  listaCategorias(){
    const url = '/restaurante/sub_item/categoria/listar?uuid-restaurante=1d77cd66-78c4-4d7a-847b-242f354f25e9';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    });

    this.http.get(url,  { headers : headers}).subscribe(data => {
        let resposta : RespostaRequisicao = Object.create(RespostaRequisicao);
        resposta = {...resposta, ...data}  

        for(let categoria of resposta.extra as Array<CategoriaSubItem> ) {
          this.categorias.update(values => [...values, categoria]);
        }
    });
  }  

}
