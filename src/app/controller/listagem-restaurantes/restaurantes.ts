import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Restaurante } from '../../model/restaurante';
import { CardRestaurante } from "../../components/card-restaurante/card-restaurante";
import { CommonModule } from '@angular/common';
import { Header } from "../../components/header/header";
import { Footer } from '../../components/footer/footer';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CadastroRestaurante } from "../cadastro-restaurante/cadastro-restaurante";
import { Modal } from "../../components/modal/modal";
import { ModalSimNao } from "../modal-sim-nao/modal-sim-nao";
import { RespostaRequisicao } from '../../model/rest/resposta-requisicao';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  imports: [CommonModule, CardRestaurante, Header, FaIconComponent, Footer, CadastroRestaurante, Modal, ModalSimNao, ModalSimNao],
  templateUrl: './restaurantes.html',
  styleUrl: './restaurantes.css',
})
export class Restaurantes implements OnInit{

  restaurantes = signal<Restaurante[]>([]);

  constructor(private http:HttpClient, private router : Router, private route : ActivatedRoute) {}

  faPlus = faPlus;

  buscouItens? : boolean;

  ngOnInit(): void {    

    if(!this.buscouItens) {
      this.buscouItens = true;
      const url = '/restaurante/listar/usuario';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      });

      this.http.get(url,  { headers : headers}).subscribe(data => {
          let resposta : RespostaRequisicao = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data}  

          for(let restaurante of resposta.extra as Array<Restaurante> ) {
            this.restaurantes.update(values => [...values, restaurante]);

            setTimeout(() => this.buscaImagem(restaurante), 100);
          }
      });
    }      
  } 

  buscaImagem(restaurante: Restaurante) : void {

    const url = '/restaurante/imagem_perfil?uuid-restaurante=' + restaurante.uuid;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    this.http.get(url, {
        headers : headers,
        responseType: 'blob', observe: 'response'
      }).subscribe(data => {
        var imagem = URL.createObjectURL(data.body as Blob)

        restaurante.imagemBaixada = imagem;   
        restaurante.imagemCarregada = true;

        this.restaurantes.update( restaurante => restaurante.slice() );
    });

  }

  adicionarItem(restaurante: Restaurante) {    
    this.router.navigate(['controller/alteracao-item-cardapio'], { queryParams: { uuid_restaurante : restaurante.uuid}});
  }
}


