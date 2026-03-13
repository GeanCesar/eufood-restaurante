import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';
import { RespostaRequisicao } from '../model/rest/resposta-requisicao';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor( private router : Router, private  route : ActivatedRoute) {}

  private tokenService = inject(TokenService);

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): MaybeAsync<GuardResult> {    
    return this.validaLogin().then(value => {
      if(value) {
        return true;
      } else {
        this.router.navigate(['/controller/login'], { relativeTo: this.route });
        return false;
      }
    });
  }

  async validaLogin() : Promise<boolean> {
    const resposta : RespostaRequisicao = await this.tokenService.validaLogin();

    let retorno = (resposta.ok && resposta.extra) ? true : false;
    if(retorno) {
      sessionStorage.setItem("nameUser", resposta.extra as string);
    }
    return retorno;
  }

}

