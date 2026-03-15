import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { Datalist } from "../../components/datalist/datalist";
import { Button } from "../../components/button/button";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemCardapio } from '../../model/item-cardapio';
import { OptionDataList } from '../../model/option-datalist';
import { Modal } from '../../components/modal/modal';
import { ISelecaoSubItemListener } from '../../model/listeners/selecao-sub-item-listener';
import { FormsModule } from "@angular/forms";
import { SubItemCardapioRest } from '../../model/rest/cardapio/sub-item-cardapio-rest';

@Component({
  selector: 'app-modal-selecao-item',
  imports: [Datalist, Button, FormsModule],
  templateUrl: './modal-selecao-item.html',
  styleUrl: './modal-selecao-item.css',
})
export class ModalSelecaoItem {  

  @Input() modal? : Modal;

  @ViewChild('data_list') dataList ? : Datalist;

  listener ? : ISelecaoSubItemListener;
  
  itens = signal<OptionDataList[]>([]);

  itemsIgnored ? : SubItemCardapioRest[];
    
  itemSelecionado = signal<OptionDataList>(new OptionDataList);

  constructor(private http:HttpClient) {}

  alteraItem(event: any) {
    if(event != null) {
      if(event as OptionDataList) {
        this.itemSelecionado().objeto = event as OptionDataList;
      }
    }
  }

  onConcluir() {
    this.listener?.onConcluir(this.itemSelecionado().objeto as ItemCardapio);
    this.modal?.toggle();
  }

  mostrarModal(){
    this.listaSubitens();
    this.modal?.toggle();
  }

  // Executa o GET para listagem de subitens
  listaSubitens(){
    this.dataList?.limpaSelecao();
    this.itens.set([])
    this.itens().splice; 
    this.itemSelecionado.set(new OptionDataList);
    const url = '/restaurante/sub_item/listar?uuid-restaurante=1d77cd66-78c4-4d7a-847b-242f354f25e9';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    });

    this.http.get<Array<ItemCardapio>>(url,  { headers : headers}).subscribe(data => {
        for(let item of data) {
          let option : OptionDataList = new OptionDataList();
          option.objeto = item;
          option.texto = item.nome;

          if(this.podeAdicionaItem(item.uuid)) {
            this.itens.update(values => [...values, option]);
            setTimeout(() => this.buscaImagem(item), 100);
          }
          
        }
    });
  }

  podeAdicionaItem(uuid : string | undefined) : boolean {
    if(!this.itemsIgnored) 
      return true;

    if(this.itemsIgnored?.length == 0) 
      return true;

    for(let item of this.itemsIgnored) {
      if(item.uuid === uuid) {
        return false;
      }
    }

    return true;
  }

  async buscaImagem(item : ItemCardapio) : Promise<void> {  
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
      });
  }

  setListener(listener : ISelecaoSubItemListener){
    this.listener = listener;
  }

  setItemsIgnored(itemsIgnored : SubItemCardapioRest[]){
    this.itemsIgnored = itemsIgnored;
  }
}
