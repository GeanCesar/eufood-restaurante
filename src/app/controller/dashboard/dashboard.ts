import { Component, OnInit, signal } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restaurante } from '../../model/restaurante';
import { RestauranteService } from '../../services/restaurante-service';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Footer, FaIconComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  restaurante = signal<Restaurante>(new Restaurante());

  faReceipt = faReceipt;
  faBookOpen = faBookOpen;

  constructor(private router : Router, private route : ActivatedRoute, private restauranteService : RestauranteService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.restaurante().uuid = params['uuid_restaurante'];      
      this.restauranteService.buscaRestaurante(params['uuid_restaurante']).subscribe(data => {
        this.restaurante.set(data);
      });      
    });
  }

  abrirCardapio() {    
    if(this.restaurante)
      this.router.navigate(['controller/alteracao-item-cardapio'], { queryParams: { uuid_restaurante : this.restaurante().uuid}});
  }

  abrirPedidos(){
    if(this.restaurante)
      this.router.navigate(['controller/listagem-pedidos'], { queryParams: { uuid_restaurante : this.restaurante().uuid}});
  }

}
