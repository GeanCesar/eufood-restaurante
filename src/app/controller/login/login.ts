import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { Footer } from "../../components/footer/footer"
import { Textfield } from '../../components/textfield/textfield';
import { Button } from '../../components/button/button';
import { Logo } from '../../components/logo/logo';
import { Usuario } from '../../model/usuario';
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
      this.progress.set(true);

       const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
          'Accept': 'text/plain'          
      });

      this.http.post(url, this.usuario, {headers: headers, responseType: 'text'}).subscribe(data => {
        if(data) {
          this.progress.set(false);      
          this.isDisabled.set(false);   
          this.mensagem.set("");
          sessionStorage.setItem('accessToken', data as string)
          this.isDisabled.set(false);
          this.router.navigate(['/controller/restaurantes'], { relativeTo: this.route });
        }        
      }, error => {
         this.mostraErro(error);
      });
    }
  }

  mostraErro(error : string) : void {
    this.mensagem.set(error);
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