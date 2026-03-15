import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Textfield } from "../../components/textfield/textfield";
import { OptionDataList } from '../../model/option-datalist';
import { CategoriaItemCardapio } from '../../model/categoria-item-cardapio';
import { FormsModule } from '@angular/forms';
import { Datalist, ItemGenerico } from "../../components/datalist/datalist";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemCardapio } from '../../model/item-cardapio';
import { Checkbox } from "../../components/checkbox/checkbox";
import { FileChooser } from "../../components/file-chooser/file-chooser";
import { Button } from "../../components/button/button";
import { CadastrarItemCardapioRest } from '../../model/rest/cardapio/cadastrar-item-cardapio-rest';
import { IFileChooserListener } from '../../model/listeners/file-chooser-listener';
import { Header } from "../../components/header/header";
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';
import { CurrencyI18nDirective } from '../../util/currency-i18n.directive';
import { CurrencyPipe } from '@angular/common';
import { ItemCardapioService } from '../../services/item-cardapio-service';

@Component({
  selector: 'app-cadastro-item-cardapio',
  imports: [FontAwesomeModule, Textfield, FormsModule, Datalist, Checkbox, FileChooser, Button, Header, Footer],  
  providers: [CurrencyPipe],
  templateUrl: './cadastro-item-cardapio.html',
  styleUrl: './cadastro-item-cardapio.css',
})
export class CadastroItemCardapio implements OnInit, IFileChooserListener {

  categorias = signal<CategoriaItemCardapio[]>([]);

  item = signal<ItemCardapio>(new ItemCardapio());
    
  constructor(private http:HttpClient, private router : Router, private route: ActivatedRoute, private _location : Location, private itemService : ItemCardapioService) {}

  @Input() subItem ? : Checkbox;
  @ViewChild('fileUpload') fileSelector? : FileChooser;

  uuidRestaurante : string = "";
  uuidItemAlteracao ? : string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.uuidRestaurante = params['uuid_restaurante'];
      this.uuidItemAlteracao = params['uuid_item'];
    });
   
    this.buscarItem();
    this.buscarCategorias();
    this.fileSelector?.setListener(this);
  }

  carregaImagem(item : ItemCardapio){
    if(item && item.uuid) {
      let uuid = item.uuid;
      if(uuid) {
        this.itemService.buscaImagem(uuid).subscribe(arquivo => {          
            var imagem = URL.createObjectURL(arquivo)  
            item.imagemBaixada = imagem;   
            item.imagemCarregada = true;
            this.item.set(item);         
        });        
      }
    }
  }

  buscarItem(){
    if(this.uuidItemAlteracao) {

      const url = "/restaurante/item_cardapio/buscar";

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
      });

      const params = new HttpParams().set("uuid-item", this.uuidItemAlteracao);

      const parametros = { params: params, headers : headers}

      this.http.get<ItemCardapio>(url,  parametros).subscribe(data => {        
          this.carregaCampos(data);
      });
    }
  }

  carregaCampos(item: ItemCardapio) {    
    this.carregaImagem(item);
  }

  alterarSubitens() {
    this.router.navigate(['/controller/selecao-sub-item', this.item().uuid]);
  }

  alteraCategoria(event: any) {
    if(event != null) {
      if((event as CategoriaItemCardapio).uuid) {
        this.item().categoria = event;
      } else {        
        event = event as ItemGenerico;
        let categoria = new CategoriaItemCardapio(event.label, this.uuidRestaurante);
        
        categoria.itensAdicionados = [];
        categoria.ordem = 0;
        categoria.uuid;
        this.item().categoria = categoria;        
        this.categorias().push(categoria);
        this.cadastraNovaCategoria(categoria);        
      }   
    }
  }

  private cadastraNovaCategoria(categoria : CategoriaItemCardapio){
      const url = "/restaurante/categoria/cadastrar";

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
      });

      this.http.post(url, categoria, { headers: headers, responseType: 'text' }).subscribe(data => {
          let uuidCadastrado = data;
          categoria.uuid = uuidCadastrado;
      });
  }

  private buscarCategorias(){
      const url = "/restaurante/categoria/listar";

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
      });

      const params = new HttpParams().set("uuid-restaurante", this.uuidRestaurante);

      const parametros = { params: params, headers : headers}

      this.http.get(url,  parametros).subscribe(data => {
          for(let categoria of data as Array<CategoriaItemCardapio> ) {
            this.categorias.update(values => [...values, categoria]);
          }
      });
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

  checkEvent(event: any) {
    if(event) {
      this.item().tipoItem = "SUBITEM";
    } else {
      this.item().tipoItem = "ITEM";
    }
  }

  voltar() {
    this._location.back();
  }

  enviar() {
    this.item().uuidRestaurante = this.uuidRestaurante;
    let rest = new CadastrarItemCardapioRest();
    rest.fromItemCardapio(this.item());
    this.cadastrarItem(rest);
  }

  // Adiciona novo item no cardapio através do metodo POST
  cadastrarItem(rest: CadastrarItemCardapioRest) {    
    if(this.item) {
      let url = '/restaurante/item_cardapio/cadastrar';

      if(this.item().tipoItem === "SUBITEM") {
        url = "/restaurante/sub_item/cadastrar";
      }

      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        });

      this.http.post(url, rest, {      
        headers : headers,
        responseType: 'text'
      }).subscribe(data => {
          if(data) {
            if(this.item().imagemBaixada) {
              this.item().uuid = data;
              this.uploadImagem();
            }
          }
        }, error => {
          console.log(error);
        });
    }
  }

  async uploadImagem(): Promise<void> {
    if(this.fileSelector?.file && this.item().uuid) {
      const formData = new FormData();
      formData.append("file", this.fileSelector.file);
      formData.append("uuid-restaurante", this.uuidRestaurante);

      let uuidItem = this.item().uuid;
      if(uuidItem){
        formData.append("uuid-item-cardapio", uuidItem);
      }

      const url = "/restaurante/item_cardapio/upload/imagem_perfil";           

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      });

      this.http.post(url, formData, {      
        headers : headers,
        observe: 'events',
        reportProgress: true
      })     
      .subscribe(data => {
        if(data.type == HttpEventType.Response) {
          this.router.navigate(['controller/alteracao-item-cardapio'], { queryParams: { uuid_restaurante : this.uuidRestaurante}});
        }        
      });      
    }    
  }

  onSeleciona(arquivoCarregado?: string | ArrayBuffer | null): void {
    this.item().imagemBaixada = arquivoCarregado as string;
  }

}
