import { Component, OnInit, signal } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Button } from "../../components/button/button";
import { Textfield } from "../../components/textfield/textfield";
import { OptionDataList } from '../../model/option-datalist';
import { CategoriaItemCardapio } from '../../model/categoria-item-cardapio';
import { FormsModule } from '@angular/forms';
import { Datalist } from "../../components/datalist/datalist";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RespostaRequisicao } from '../../model/respostaRequisicao';
import { ItemCardapio } from '../../model/item-cardapio';
import { Checkbox } from "../../components/checkbox/checkbox";

@Component({
  selector: 'app-cadastro-item-cardapio',
  imports: [FontAwesomeModule, Button, Textfield, FormsModule, Datalist, Checkbox],
  templateUrl: './cadastro-item-cardapio.html',
  styleUrl: './cadastro-item-cardapio.css',
})
export class CadastroItemCardapio implements OnInit {    
  
  faCircle = faCircle;
  categorias = signal<CategoriaItemCardapio[]>([]);

  item : ItemCardapio = new ItemCardapio();
    
  constructor(private http:HttpClient) {}

  ngOnInit(): void {
      this.buscarCategorias();
  }

  private buscarCategorias(){
      const url = "/restaurante/categoria/listar";

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
      });

      const params = new HttpParams().set("uuid-restaurante", "1d77cd66-78c4-4d7a-847b-242f354f25e9");

      const parametros = { params: params, headers : headers}

      this.http.get(url,  parametros).subscribe(data => {
          let resposta : RespostaRequisicao = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data}  

          for(let categoria of resposta.extra as Array<CategoriaItemCardapio> ) {
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

}
