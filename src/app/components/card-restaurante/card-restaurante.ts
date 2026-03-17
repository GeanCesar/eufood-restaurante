import { Component, Input } from '@angular/core';
import { Restaurante } from '../../model/restaurante';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from "../modal/modal";
import { IModalSimNaoListener } from '../../model/listeners/modal-sim-nao-listener';
import { ModalSimNao } from '../../controller/modal-sim-nao/modal-sim-nao';
import { RestauranteService } from '../../services/restaurante-service';

@Component({
  selector: 'app-card-restaurante',
  imports: [FaIconComponent, FormsModule],
  templateUrl: './card-restaurante.html',
  styleUrl: './card-restaurante.css',
})

export class CardRestaurante implements IModalSimNaoListener {

  @Input() restaurante? : Restaurante;

  @Input() modal ? : Modal;
  @Input() modalDeletarRestaurante ? : ModalSimNao;

  faTimes = faCircleXmark;
  
  constructor(private http:HttpClient, private router : Router, private  route : ActivatedRoute, private restauranteService : RestauranteService) {}

  onSim(): void {    
    this.removerRestaurante();
  }

  abrirDashboard() {    
    if(this.restaurante)
      this.router.navigate(['/controller/dashboard'], { queryParams: { uuid_restaurante : this.restaurante.uuid}});
  }

  mostraModal(){
    this.modalDeletarRestaurante?.setListener(this);
    this.modal?.toggle();
  }

  async removerRestaurante() {
      if(this.restaurante) {
        this.restauranteService.removerRestaurante(this.restaurante.uuid).subscribe(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/controller/restaurantes'], { relativeTo: this.route });
        });
      });
    }    
  }
}
