import { Component, signal, ViewChild } from '@angular/core';
import { MatProgressBar } from "@angular/material/progress-bar";
import { Button } from "../../components/button/button";
import { FileChooser } from "../../components/file-chooser/file-chooser";
import { Textfield } from "../../components/textfield/textfield";
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Restaurante } from '../../model/restaurante';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RespostaRequisicao } from '../../model/rest/resposta-requisicao';

@Component({
  selector: 'app-cadastro-restaurante',
  imports: [MatProgressBar, Button, FileChooser, Textfield, FormsModule],
  templateUrl: './cadastro-restaurante.html',
  styleUrl: './cadastro-restaurante.css',
})
export class CadastroRestaurante {
  
  @ViewChild('fileUpload') fileSelector? : FileChooser;

  constructor(private http:HttpClient, private router : Router, private  route : ActivatedRoute) {}
  
  isDisabled = signal(false);  
  progress = signal(false);  
  restaurante : Restaurante = new Restaurante();
  nome ? : string;
  uuidRestaurante ? : string;
  
  async onSubmit(): Promise<void> {  
    
    const url = "/restaurante/cadastrar";      
    this.isDisabled.set(true);
    this.progress.set(true);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
      'Content-Type': 'application/json'
    });

    this.http.post(url, this.restaurante, {      
        headers : headers,
        observe: 'events',
        reportProgress: true
      }).subscribe(data => {
        if(data.type == HttpEventType.Response) {
          let resposta = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data.body}
          
          this.uuidRestaurante = (resposta as RespostaRequisicao).extra as string;
          this.uploadImagem();
        }        
      }, () => {
        this.progress.set(false);
        this.isDisabled.set(false);
      });
  }

  async uploadImagem(): Promise<void> {
    if(this.fileSelector?.file && this.uuidRestaurante) {
      const formData = new FormData();
      formData.append("file", this.fileSelector.file);
      formData.append("uuid-restaurante", this.uuidRestaurante);

      const url = "/restaurante/upload/imagem_perfil";           

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
          this.progress.set(false);
          let resposta = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data.body}
          
          this.isDisabled.set(false);    
          this.progress.set(false);

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/controller/restaurantes'], { relativeTo: this.route });
          });

        }        
      });      
    }    
  }

  
  disableSubmit() {
    let disabled = true;
    if (this.restaurante?.nome) {
      disabled = false;
      return;
    }
    return disabled;
  }

}

