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
import { ActivatedRoute, Router } from '@angular/router';
import { RestauranteService } from '../../services/restaurante-service';

@Component({
  selector: 'app-restaurantes',
  imports: [CommonModule, CardRestaurante, Header, FaIconComponent, Footer, CadastroRestaurante, Modal, ModalSimNao, ModalSimNao],
  templateUrl: './restaurantes.html',
  styleUrl: './restaurantes.css',
})
export class Restaurantes implements OnInit{

  restaurantes = signal<Restaurante[]>([]);

  constructor(private http:HttpClient, private router : Router, private route : ActivatedRoute, private restauranteService : RestauranteService ) {}

  faPlus = faPlus;

  buscouItens? : boolean;

  ngOnInit(): void {
    if(!this.buscouItens) {
      this.buscouItens = true;
      this.restauranteService.listarPorUsuario().subscribe(data => {
          for(let restaurante of data) {
            this.restaurantes.update(values => [...values, restaurante]);
            setTimeout(() => this.buscaImagem(restaurante), 100);
          }
      });
    }      
  } 

  buscaImagem(restaurante: Restaurante) : void {
    this.restauranteService.buscaImagem(restaurante).subscribe(data => {
      var imagem = URL.createObjectURL(data as Blob)

      restaurante.imagemBaixada = imagem;   
      restaurante.imagemCarregada = true;

      this.restaurantes.update( restaurante => restaurante.slice() );
    });

  }
}


