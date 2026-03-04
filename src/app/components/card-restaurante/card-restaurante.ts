import { Component, Input } from '@angular/core';
import { Restaurante } from '../../model/restaurante';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from "../modal/modal";
import { ICardRestauranteListener } from '../../model/listeners/card-restaurante-listener';
import { ModalDeletarRestaurante } from '../../controller/modal-deletar-restaurante/modal-deletar-restaurante';

@Component({
  selector: 'app-card-restaurante',
  imports: [FaIconComponent, FormsModule],
  templateUrl: './card-restaurante.html',
  styleUrl: './card-restaurante.css',
})

export class CardRestaurante implements ICardRestauranteListener {

  @Input() restaurante? : Restaurante;

  @Input() modal ? : Modal;
  @Input() modalDeletarRestaurante ? : ModalDeletarRestaurante;

  faTimes = faCircleXmark;
  
  constructor(private http:HttpClient, private router : Router, private  route : ActivatedRoute) {}

  onSim(): void {    
      this.removerRestaurante();
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

    this.http.delete(url, parametros).pipe().subscribe(sucesso => {
        if(sucesso) {
           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/controller/restaurantes'], { relativeTo: this.route });
          });
        }        
      });
    }
}
