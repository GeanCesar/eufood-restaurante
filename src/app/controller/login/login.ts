import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { Footer } from "../../components/footer/footer"
import { Textfield } from '../../components/textfield/textfield';
import { Button } from '../../components/button/button';
import { Logo } from '../../components/logo/logo';
import { Usuario } from '../../model/usuario';
import { RespostaRequisicao } from '../../model/respostaRequisicao';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Footer, Textfield, Button, Logo, FormsModule, MatProgressBarModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  protected readonly title = signal('EuFood Restaurante');

  constructor(private http:HttpClient, private router : Router, private route : ActivatedRoute) {}

  usuario:Usuario = new Usuario("", "");

  mensagem = signal("");
  progress = signal(false);
  isDisabled = signal(false);

  async onSubmit(): Promise<void> {    
    if(this.validaCampos()) {
      const url = "/usuario_login/login";      
      this.isDisabled.set(true);

      this.http.post(url, this.usuario, {
        observe: 'events',
        reportProgress: true
      }).pipe(        
        tap((message : HttpEvent<Object>) => {          
          if (message.type == HttpEventType.UploadProgress) {
            this.progress.set(true);
          } else if(message.type == HttpEventType.DownloadProgress) {
            this.progress.set(false);
          }
        }),
      ).subscribe(data => {
        if(data.type == HttpEventType.Response) {
          this.progress.set(false);
          this.mensagem.set("");
          let resposta = Object.create(RespostaRequisicao);
          resposta = {...resposta, ...data.body}          
          sessionStorage.setItem('accessToken', resposta.extra)
          this.isDisabled.set(false);
          
          this.router.navigate(['/controller/restaurantes'], { relativeTo: this.route });
        }        
      }, error => {        
         this.mostraErro();
      });
    }
  }

  mostraErro() : void {
    this.mensagem.set("Usuário / senhas inválidos");
    this.progress.set(false);
    this.isDisabled.set(false);
  }

  validaCampos() : boolean{
    if(this.usuario.telefone == "") {
      this.mensagem.set("Telefone vazio");
      return false;
    }

    if(this.usuario.senha == "") {
      this.mensagem.set("Senha vazia");
      return false;
    }

    this.normalizaCampos();
    return true;
  }

  normalizaCampos() : void{
    this.usuario.telefone = this.usuario.telefone?.replace("(", "")
    this.usuario.telefone = this.usuario.telefone?.replace(")", "")
    this.usuario.telefone = this.usuario.telefone?.replace("-", "")
    this.usuario.telefone = this.usuario.telefone?.replace(" ", "")
  }

  
}