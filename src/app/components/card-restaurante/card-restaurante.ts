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
  
  constructor(private http:HttpClient, private router : Router, private  route : ActivatedRoute) {}

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
    const url = "/restaurante/deletar";        

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
      'Content-Type': 'application/json'
    });

    const parametros = this.restaurante?.uuid ? { params: new HttpParams().set('uuid-restaurante', this.restaurante?.uuid), headers : headers } : {};

    this.http.delete(url, parametros).subscribe(sucesso => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/controller/restaurantes'], { relativeTo: this.route });
        });
      });
    }
}
